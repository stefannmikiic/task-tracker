import TaskCard from "./TaskCard";
export default function TaskList({ tasks, onDelete, onDone, onProgress }) {
  return (
    <div className="grid gap-3">
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onDelete={onDelete}
          onDone={onDone}
          onProgress={onProgress}
        />
      ))}
    </div>
  );
}