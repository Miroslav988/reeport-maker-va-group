import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.isRunning
            ? { ...task, elapsedTime: task.elapsedTime + 1 }
            : task
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTask = (newTask) => {
    // Останавливаем все текущие задачи
    setTasks(prevTasks =>
      prevTasks.map(task => ({
        ...task,
        isRunning: false
      }))
    );
    
    // Добавляем новую задачу
    setTasks(prevTasks => [
      ...prevTasks,
      {
        ...newTask,
        id: Date.now(),
        isRunning: true
      }
    ]);
  };

  const handleToggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Если задача запускается, останавливаем все остальные
          if (!task.isRunning) {
            return {
              ...task,
              isRunning: true
            };
          }
          return {
            ...task,
            isRunning: false
          };
        }
        // Если текущая задача запускается, останавливаем все остальные
        return task.id !== taskId && task.isRunning
          ? { ...task, isRunning: false }
          : task;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <h1>Трекер задач</h1>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
