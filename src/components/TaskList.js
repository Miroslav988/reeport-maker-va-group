import React from 'react';
import { formatTime } from '../utils/timeUtils';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-info">
            <span>{task.name}</span>
            <span>{formatTime(task.elapsedTime)}</span>
          </div>
          <div className="task-controls">
            <button onClick={() => onToggleTask(task.id)}>
              {task.isRunning ? 'Пауза' : 'Старт'}
            </button>
            <button onClick={() => onDeleteTask(task.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
