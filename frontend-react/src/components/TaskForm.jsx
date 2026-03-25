import { useState } from "react";
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

      <button
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() => {
          if (!title) return;
          onAdd({ title, description });
          setTitle("");
          setDescription("");
        }}
      >
        Add Task
      </button>
    </div>
  );
}