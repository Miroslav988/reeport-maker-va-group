import React, { useState } from 'react';
import { getCurrentTime } from '../utils/timeUtils';

const TaskInput = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask({
        name: taskName,
        startTime: getCurrentTime(),
        elapsedTime: 0,
        isRunning: true
      });
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Введите название задачи"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TaskInput;
