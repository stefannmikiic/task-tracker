import { useState } from "react";
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col gap-3">

      <input
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() => {
          if (!title || !description) {
            setError("You have to enter both title and description!");
            return;
          }
          onAdd({ title, description });
          setTitle("");
          setDescription("");
          setError("");
        }}
      >
        Add Task
      </button>
    </div>
  );
}