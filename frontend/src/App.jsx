import { useEffect, useState } from "react";

const API_URL = "/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not load tasks");
      setTasks(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      setError("");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not add task");
      setTasks((current) => [data, ...current]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTask(task) {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed })
      });
      const updated = await response.json();
      if (!response.ok) throw new Error(updated.message || "Could not update task");
      setTasks((current) => current.map((item) => item._id === updated._id ? updated : item));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Could not delete task");
      setTasks((current) => current.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <main className="page">
      <section className="panel">
        <div className="eyebrow">DOCKER + DOCKER COMPOSE</div>
        <h1>Full-Stack Task Manager</h1>
        <p className="subtitle">A React, Node.js and MongoDB application running in containers.</p>

        <div className="stats">
          <div><strong>{tasks.length}</strong><span>Total tasks</span></div>
          <div><strong>{completed}</strong><span>Completed</span></div>
          <div><strong>{tasks.length - completed}</strong><span>Pending</span></div>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            maxLength={120}
            aria-label="New task title"
          />
          <button type="submit">Add task</button>
        </form>

        {error && <p className="error" role="alert">{error}</p>}
        {loading ? <p className="message">Loading tasks...</p> : (
          tasks.length === 0 ? <p className="message">No tasks yet. Add your first task above.</p> : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className={task.completed ? "done" : ""}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                    />
                    <span>{task.title}</span>
                  </label>
                  <button className="delete" onClick={() => deleteTask(task._id)} aria-label={`Delete ${task.title}`}>Delete</button>
                </li>
              ))}
            </ul>
          )
        )}
        <footer>Frontend · Nginx &nbsp;|&nbsp; API · Express &nbsp;|&nbsp; Data · MongoDB</footer>
      </section>
    </main>
  );
}
