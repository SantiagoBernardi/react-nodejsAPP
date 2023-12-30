import { useEffect, useState } from 'react';
import Task from './task';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { text: newTaskText })
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error adding task:', error));
    setNewTaskText('');
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error deleting task:', error));
  };

  const toggleTaskCompletion = (taskId) => {
    axios.patch(`http://localhost:5000/tasks/${taskId}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error toggling task completion:', error));
  };

  return (
    <div className='lista'>
      <h1>Lista de Tareas</h1>
      <div>
          <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          />
        <button onClick={addTask}>Agregar Tarea</button>
      </div>
      <div className='lista-items'>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggleCompletion={toggleTaskCompletion} 
          />
          ))}
      </div>
      
    </div>
  );
};

export default TodoList;
