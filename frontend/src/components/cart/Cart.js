import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };
  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <div className="empty-cart-page">
          <div className="empty-cart-content">
            <i className="fa fa-shopping-bag"></i>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="cart-page">
            <div className="cart-heading">
              <h2>Shopping Cart</h2>
              <p>{items.length} items in your cart</p>
            </div>

            <div className="row cart-layout">
              {/* Cart Items */}

              <div className="col-12 col-lg-8">
                <div className="cart-items-container">
                  {items.map((item) => (
                    <Fragment key={item.product}>
                      <div className="cart-item">
                        <div className="cart-product-image">
                          <img src={item.image} alt={item.name} />
                        </div>

                        <div className="cart-product-details">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>

                          <p className="cart-product-price">${item.price}</p>

                          <div className="cart-quantity">
                            <div className="stockCounter">
                              <span
                                className="btn minus"
                                onClick={() => decreaseQty(item)}
                              >
                                -
                              </span>

                              <input
                                type="number"
                                className="form-control count"
                                value={item.quantity}
                                readOnly
                              />

                              <span
                                className="btn plus"
                                onClick={() => increaseQty(item)}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="cart-item-total">
                          <p>${(item.quantity * item.price).toFixed(2)}</p>

                          <i
                            id="delete_cart_item"
                            onClick={() =>
                              dispatch(removeItemFromCart(item.product))
                            }
                            className="fa fa-trash"
                          ></i>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>

                <Link to="/" className="continue-shopping-link">
                  <i className="fa fa-arrow-left"></i> Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}

              <div className="col-12 col-lg-4">
                <div className="order-summary-card" id="order_summary">
                  <h4>Order Summary</h4>

                  <div className="summary-divider"></div>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>
                      {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      Units
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Est. Total</span>
                    <span className="summary-total">
                      $
                      {items
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="summary-divider"></div>

                  <button
                    id="checkout_btn"
                    onClick={checkoutHandler}
                    className="btn btn-block"
                  >
                    PROCEED TO CHECKOUT
                    <i className="fa fa-arrow-right ml-2"></i>
                  </button>

                  <p className="secure-checkout">
                    <i className="fa fa-lock"></i> Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
