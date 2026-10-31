import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import {validateShipping} from '../cart/Shipping';
import {createOrder} from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error:orderError } = useSelector(state => state.orderState)

    const paymentData = {
        amount : Math.round( orderInfo.totalPrice * 100),
        shipping :{
            name: user.name,
            address:{
                city: shippingInfo.city,
                postal_code : shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1 : shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
        if(orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearOrderError()) }
            })
            return
        }

    },[dispatch,navigate,orderError,shippingInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const {data} = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
                toast(result.error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector('#pay_btn').disabled = false;
            }else{
                if((await result).paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))

                    navigate('/order/success')
                }else{
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            }


        } catch (error) {
            
        }
    }


    return (
    <div className="payment-page">
        <div className="payment-container">
            <form onSubmit={submitHandler} className="payment-form">
                <div className="payment-heading">
                    <span className="payment-eyebrow">SECURE CHECKOUT</span>
                    <h1>Card Information</h1>
                    <p>Enter your card details to complete your purchase.</p>
                </div>

             <div className="payment-form-group">
    <label>Card Number</label>
    <div className="stripe-input">
        <CardNumberElement
            options={{
                placeholder: "1234 1234 1234 1234",
                style: {
                    base: {
                        fontSize: "15px",
                        color: "#292929",
                        fontFamily: "Inter, sans-serif",
                        "::placeholder": {
                            color: "#99938A",
                        },
                    },
                    invalid: {
                        color: "#dc3545",
                    },
                },
            }}
        />
    </div>
</div>

<div className="payment-form-row">
    <div className="payment-form-group">
        <label>Card Expiry</label>
        <div className="stripe-input">
            <CardExpiryElement
                options={{
                    placeholder: "MM / YY",
                    style: {
                        base: {
                            fontSize: "15px",
                            color: "#292929",
                            fontFamily: "Inter, sans-serif",
                        },
                    },
                }}
            />
        </div>
    </div>

    <div className="payment-form-group">
        <label>Card CVC</label>
        <div className="stripe-input">
            <CardCvcElement
                options={{
                    placeholder: "CVC",
                    style: {
                        base: {
                            fontSize: "15px",
                            color: "#292929",
                            fontFamily: "Inter, sans-serif",
                        },
                    },
                }}
            />
        </div>
    </div>
</div>  

                <div className="payment-divider"></div>

                <div className="payment-total">
                    <span>Total Amount</span>
                    <strong>
                        ${orderInfo && Number(orderInfo.totalPrice).toFixed(2)}
                    </strong>
                </div>

                <button
                    id="pay_btn"
                    type="submit"
                    className="payment-button"
                >
                    Pay Securely
                </button>

                <p className="payment-security-note">
                    Your payment is securely processed.
                </p>
            </form>
        </div>
    </div>
);
}