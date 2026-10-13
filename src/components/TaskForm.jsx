import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { setTasks } = useContext(TaskContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskName, completed: false }),
    })
      .then((r) => r.json())
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskName("");
      });    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>New Task:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
