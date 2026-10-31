import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import  Loader from '../layouts/Loader';
import {orderDetail as orderDetailAction } from '../../actions/orderActions';
export default function OrderDetail () {
    const { orderDetail, loading } = useSelector(state => state.orderState)
    const { shippingInfo={}, user={}, orderStatus="Processing", orderItems=[], totalPrice=0, paymentInfo={} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true: false;
    const dispatch = useDispatch();
    const {id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id))
    },[id,dispatch])

   return (
    <Fragment>
        {loading ? <Loader /> :
            <Fragment>
                <div className="order-details-page">
                    <div className="order-details-container">

                        {/* Order Header */}
                        <div className="order-details-header">
                            <span className="order-eyebrow">ORDER INFORMATION</span>
                            <h1>Order Details</h1>
                            <p>Order # {orderDetail._id}</p>
                        </div>

                        <div className="order-details-layout">

                            {/* Left Section */}
                            <div className="order-main-content">

                                {/* Shipping Information */}
                                <div className="order-info-card">
                                    <h4 className="order-section-title">
                                        Shipping Information
                                    </h4>

                                    <div className="order-info-list">
                                        <div className="order-info-row">
                                            <span>Name</span>
                                            <strong>{user.name}</strong>
                                        </div>

                                        <div className="order-info-row">
                                            <span>Phone</span>
                                            <strong>{shippingInfo.phoneNo}</strong>
                                        </div>

                                        <div className="order-info-row address-row">
                                            <span>Address</span>
                                            <strong>
                                                {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}
                                            </strong>
                                        </div>

                                        <div className="order-info-row">
                                            <span>Total Amount</span>
                                            <strong>${totalPrice}</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment and Order Status */}
                                <div className="order-status-grid">

                                    <div className="order-info-card">
                                        <h4 className="order-section-title">
                                            Payment Status
                                        </h4>

                                        <span className={`order-status-badge ${isPaid ? 'status-paid' : 'status-unpaid'}`}>
                                            {isPaid ? 'PAID' : 'NOT PAID'}
                                        </span>
                                    </div>

                                    <div className="order-info-card">
                                        <h4 className="order-section-title">
                                            Order Status
                                        </h4>

                                        <span className={`order-status-badge ${orderStatus && orderStatus.includes('Delivered') ? 'status-delivered' : 'status-pending'}`}>
                                            {orderStatus}
                                        </span>
                                    </div>

                                </div>

                                {/* Order Items */}
                                <div className="order-info-card order-items-card">
                                    <h4 className="order-section-title">
                                        Order Items
                                    </h4>

                                    <div className="order-items-list">
                                        {orderItems && orderItems.map(item => (
                                            <div className="order-product-item" key={item.product}>

                                                <div className="order-product-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </div>

                                                <div className="order-product-details">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                    <span>{item.quantity} Piece(s)</span>
                                                </div>

                                                <div className="order-product-price">
                                                    ${item.price}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        }
    </Fragment>
);
}