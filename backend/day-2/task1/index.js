const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
function logger(req, res, next) {
  console.log(`${req.method} request came to ${req.url}`);

  next();
}

app.use(logger);

const students = [
  { id: 1, name: "Aman", course: "Backend" },
  { id: 2, name: "Riya", course: "Frontend" },
  { id: 3, name: "Kabir", course: "Full Stack" },
];

app.get("/", (req, res) => {
  res.send("Welcome to Student Portal");
});

app.get("/about", (req, res) => {
  res.send("This portal is used to manage student data");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const student = students.find((s) => s.id === studentId);

  if (student) {
    res.json(student);
  } else {
    res.json({
      message: "Student not found",
    });
  }
});

app.post("/login", (req, res) => {
  res.json({
    message: "Login route called",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
