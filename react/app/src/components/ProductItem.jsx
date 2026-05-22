import React from "react";

const ProductItem = React.memo(({ product, addToCart }) => {
  console.log("Rendering:", product.name);

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{product.name}</h3>

      <p>Category: {product.category}</p>

      <p>Price: ₹{product.price}</p>

      <button onClick={() => addToCart(product)}>Add To Cart</button>
    </div>
  );
});

export default ProductItem;
