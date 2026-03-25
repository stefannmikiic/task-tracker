import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  markDone,
  markProgress

} from "./api/tasks";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(false);

useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [dark]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTasks();
      setTasks(res.data);
    };

    fetchData();
  }, []);

  const handleAdd = async (task) => {
    const tempId = Date.now();

    const optimisticTask = {
      id: tempId,
      title: task.title,
      description: task.description,
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const res = await createTask(task);

      setTasks((prev) =>
        prev.map((t) => (t.id === tempId ? res.data : t))
      );
    } catch (err) {
      console.error(err);
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
    }
  };

  const handleDelete = async (id) => {
    const backup = tasks;

    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTask(id);
    } catch {
      setTasks(backup);
    }
  };

  const handleDone = async (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      )
    );

    try {
      await markDone(id);
    } catch {
      const res = await getTasks();
      setTasks(res.data);
    }
  };
  const handleProgress = async (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "in progress" } : t
      )
    );
    
    try {
      await markProgress(id);
    } catch {
      const res = await getTasks();
      setTasks(res.data);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => setDark(!dark)}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Task Manager
      </h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02] mb-6">
        <TaskForm onAdd={handleAdd} />
      </div>

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onDone={handleDone}
        onProgress={handleProgress}
      />

    </div>
  </div>
);
}
export default App;