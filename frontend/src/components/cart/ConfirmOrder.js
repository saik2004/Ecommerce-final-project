import MetaData from "../layouts/MetaData";
import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState,
  );
  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, [navigate,shippingInfo]);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <div className="confirm-order-page">
        <CheckoutSteps shipping confirmOrder />

        <div className="row confirm-order-layout">
          {/* Order Details */}

          <div className="col-12 col-lg-8">
            <div className="confirm-order-card">
              <h4 className="confirm-section-title">Shipping Information</h4>

              <div className="shipping-details">
                <div className="shipping-detail-row">
                  <span>Name</span>
                  <strong>{user.name}</strong>
                </div>

                <div className="shipping-detail-row">
                  <span>Phone</span>
                  <strong>{shippingInfo.phoneNo}</strong>
                </div>

                <div className="shipping-detail-row address-row">
                  <span>Delivery Address</span>
                  <strong>
                    {shippingInfo.address}, {shippingInfo.city},{" "}
                    {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                    {shippingInfo.country}
                  </strong>
                </div>
              </div>

              <div className="confirm-divider"></div>

              <h4 className="confirm-section-title">Your Cart Items</h4>

              <div className="confirm-cart-items">
                {cartItems.map((item) => (
                  <Fragment key={item.product}>
                    <div className="confirm-cart-item">
                      <div className="confirm-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="confirm-item-details">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>

                        <p>Quantity: {item.quantity}</p>
                      </div>

                      <div className="confirm-item-price">
                        <p>
                          ${item.quantity} × ${item.price}
                        </p>

                        <strong>
                          ${(item.quantity * item.price).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}

          <div className="col-12 col-lg-4">
            <div className="confirm-summary-card" id="order_summary">
              <h4>Order Summary</h4>

              <div className="confirm-divider"></div>

              <div className="confirm-summary-row">
                <span>Subtotal</span>
                <span>${itemsPrice}</span>
              </div>

              <div className="confirm-summary-row">
                <span>Shipping</span>
                <span>${shippingPrice}</span>
              </div>

              <div className="confirm-summary-row">
                <span>Tax</span>
                <span>${taxPrice}</span>
              </div>

              <div className="confirm-divider"></div>

              <div className="confirm-total-row">
                <strong>Total Amount</strong>
                <strong>${totalPrice}</strong>
              </div>

              <button
                id="checkout_btn"
                onClick={processPayment}
                className="btn btn-block"
              >
                PROCEED TO PAYMENT
                <i className="fa fa-arrow-right ml-2"></i>
              </button>

              <p className="confirm-secure-text">
                <i className="fa fa-lock"></i>
                Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
