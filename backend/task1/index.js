const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: "Revise Node.js", completed: false },
  { id: 2, title: "Practice Express routes", completed: true },
];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET task by id
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.json(task);
});

// POST create new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// DELETE task by id
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
