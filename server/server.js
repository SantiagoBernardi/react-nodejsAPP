import express from 'express';
import cors from 'cors';
import process from 'process';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    text: req.body.text,
    completed: false,
  };
  tasks.push(newTask);
  res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json(tasks);
});

app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
