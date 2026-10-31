import { Link } from "react-router-dom";

export default function Product({ product, col }) {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      {" "}
      <div className="card product-card">
        {product.images.length > 0 && (
          <div className="product-image-container">
            <img
              className="card-img-top product-image"
              src={product.images[0].image}
              alt={product.name}
            />
          </div>
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>

          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>

            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>

          <p className="card-text product-price">${product.price}</p>

          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
