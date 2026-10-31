export default function OrderSuccess() {
    return (
    <div className="order-success-page">
        <div className="order-success-container">

            <div className="success-icon-wrapper">
                <img
                    src="/images/success.png"
                    alt="Order Success"
                    className="success-image"
                />
            </div>

            <span className="success-eyebrow">ORDER CONFIRMED</span>

            <h2>Your order has been placed successfully!</h2>

            <p className="success-description">
                Thank you for shopping with us. Your order is confirmed
                and we're getting it ready.
            </p>

            <a href="/orders" className="view-orders-btn">
                View My Orders
            </a>

            <p className="success-footer">
                Thank you for choosing JVLcart.
            </p>

        </div>
    </div>
);
}