import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetching initial tasks happens within the context
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  // Function to handle submitting a new task
  function addTask(taskName) {
    return fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskName, completed: false }),
    })
      .then((r) => r.json())
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      });
  }

  // Function to toggle a task's completion status
  function handleToggle(task) {
    fetch(`http://localhost:6001/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((r) => r.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
      });
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, handleToggle }}>
      {children}
    </TaskContext.Provider>
  );
}

