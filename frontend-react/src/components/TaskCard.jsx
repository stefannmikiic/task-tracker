import { useState } from "react";

export default function TaskCard({ task, onDelete, onDone, onProgress, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const statusColor =
    task.status === "done"
      ? "bg-green-100 text-green-700"
      : task.status === "in-progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">

      <div className="flex justify-between items-start">
        <div>
  {isEditing ? (
    <input
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      className="border px-2 py-1 rounded w-full"
    />
  ) : (
    <h3 className="text-lg font-semibold">{task.title}</h3>
  )}

  <p className="text-gray-500 text-sm">
    {task.description}
  </p>
</div>

        <span className={`px-2 py-1 text-xs rounded ${statusColor}`}>
          {task.status}
        </span>
      </div>

      <div className="flex gap-2 mt-4">

  <button
    onClick={() => onProgress(task.id)}
    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
  >
    In Progress
  </button>

  <button
    onClick={() => onDone(task.id)}
    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
  >
    Done
  </button>

  <button
    onClick={() => onDelete(task.id)}
    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
  >
    Delete
  </button>

  {isEditing ? (
    <>
      <button
        onClick={() => {
          onUpdate(task.id, { title: newTitle });
          setIsEditing(false);
        }}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
      >
        Save
      </button>

      <button
        onClick={() => {
          setIsEditing(false);
          setNewTitle(task.title);
        }}
        className="px-3 py-1 text-sm bg-gray-400 text-white rounded"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Update
    </button>
  )}
</div>
    </div>
  );
}