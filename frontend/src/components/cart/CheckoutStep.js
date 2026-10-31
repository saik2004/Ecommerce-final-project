import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="checkout-progress">
      <Link to="/shipping" className="checkout-step">
        <div className={`step-circle ${shipping ? "active" : ""}`}>1</div>
        <span className={`step-label ${shipping ? "active-label" : ""}`}>
          Shipping Info
        </span>
      </Link>

      <div
        className={`step-connector ${confirmOrder || payment ? "completed" : ""}`}
      ></div>

      <Link to="/order/confirm" className="checkout-step">
        <div className={`step-circle ${confirmOrder ? "active" : ""}`}>2</div>
        <span className={`step-label ${confirmOrder ? "active-label" : ""}`}>
          Confirm Order
        </span>
      </Link>

      <div className={`step-connector ${payment ? "completed" : ""}`}></div>

      <Link to="/payment" className="checkout-step">
        <div className={`step-circle ${payment ? "active" : ""}`}>3</div>
        <span className={`step-label ${payment ? "active-label" : ""}`}>
          Payment
        </span>
      </Link>
    </div>
  );
}
