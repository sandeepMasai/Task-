const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized access",
    });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "secret123") {
    return res.status(401).json({
      error: "Unauthorized access",
    });
  }

  next();
};

app.get("/public", (req, res) => {
  res.json({
    message: "This is a public route",
  });
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    name: "Student User",
    role: "Developer",
  });
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    totalUsers: 120,
    activeTasks: 45,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
