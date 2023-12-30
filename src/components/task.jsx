import { useState } from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, onDelete, onToggleCompletation }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleCompletation = () => {
    setIsCompleted(!isCompleted);
    onToggleCompletation(task.id, !isCompleted);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };


  return (
    <div className='tarea'>
      {task.text}
      <button onClick={handleToggleCompletation}>{isCompleted ? 'Completa' : 'Incompleta'}</button>
        <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompletation: PropTypes.func.isRequired,
};

export default Task;
