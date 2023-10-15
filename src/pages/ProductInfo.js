import React, { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";

function ProductInfo() {
  // State variables
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0); // New state for rating
  const [hoverRating, setHoverRating] = useState(0); // New state for hover rating

  // Access Redux store
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  // Get product ID from URL params
  const params = useParams();

  // Fetch product data from Firestore
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      setProduct(productTemp.data());
      setRating(productTemp.data()?.rating || 0); // Set initial rating value
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Add product to cart
  const addToCart = (product) => {
    const updatedProduct = {
      ...product,
      rating: rating || hoverRating, // Use either rating or hoverRating
    };

    // Update Firestore document with the new rating
    updateDoc(doc(fireDB, "products", params.productid), updatedProduct)
      .then(() => {
        dispatch({ type: "ADD_TO_CART", payload: updatedProduct });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update cart items in local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <h3>
                    <b>{product.name}</b>
                  </h3>
                </p>
                <hr />
                <img src={product.imageURL} className="product-info-img" />
                <p>
                  <em>{product.description}</em>
                </p>
                <hr />
                {/* Rating UI */}
                <div>
                  <p>Rate this product:</p>
                  <StarRating
                    fraction={2}
                   rating={rating}
                    onRatingChange={handleRatingChange}
                    hoverRating={hoverRating} // Pass hoverRating as a prop
                    setHoverRating={setHoverRating} // Pass setHoverRating as a prop
                  />
                   {rating !== 0 && (
                  <p>rating: {rating}</p>
                )}
                </div>
                <hr />
                <div className="d-flex justify-content-end my-3">
                  <button onClick={() => addToCart(product)}>ADD TO CART</button>
                </div>
               
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StarRating({ rating, onRatingChange, hoverRating, setHoverRating }) {
  const handleClick = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= (hoverRating || rating) ? "filled" : ""}`}
          onClick={() => handleClick(value)}
          onMouseEnter={() => setHoverRating(value)}
          onMouseLeave={() => setHoverRating(0)}
          style={{ cursor: "pointer" }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default ProductInfo;
