import { useState, useMemo, useCallback } from "react";

import ProductItem from "../components/ProductItem";

function Qc2() {
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [counter, setCounter] = useState(0);

  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 50000,
    },

    {
      id: 2,
      name: "Phone",
      category: "Electronics",
      price: 30000,
    },

    {
      id: 3,
      name: "Shoes",
      category: "Fashion",
      price: 2000,
    },

    {
      id: 4,
      name: "Watch",
      category: "Accessories",
      price: 5000,
    },

    {
      id: 5,
      name: "Bag",
      category: "Fashion",
      price: 1500,
    },
  ];

  const filteredProducts = useMemo(() => {
    console.log("Filtering Products...");

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const cartTotal = useMemo(() => {
    console.log("Calculating Total...");

    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Product Search & Cart App</h1>

      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      <h2>Counter: {counter}</h2>

      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>

      <hr />

      <h2>Cart Items: {cart.length}</h2>

      <h2>Cart Total: ₹{cartTotal}</h2>

      <hr />

      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default Qc2;
