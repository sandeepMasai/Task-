const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mouse", price: 800 },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      return next(error);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.post("/products", (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name) {
      const error = new Error("Name is required");
      error.status = 400;
      return next(error);
    }

    if (price === undefined) {
      const error = new Error("Price is required");
      error.status = 400;
      return next(error);
    }

    if (typeof price !== "number") {
      const error = new Error("Price must be a number");
      error.status = 400;
      return next(error);
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
