import json
from datetime import datetime

class TaskManager:
    def __init__(self, file_path="tasks.json"):
        self.file_path = file_path
        self.tasks = self.load_tasks()

    def load_tasks(self):
        try:
            with open(self.file_path, "r") as f:
                return json.load(f)
        except:
            return []

    def save_tasks(self):
        with open(self.file_path, "w") as f:
            json.dump(self.tasks, f, indent=4)

    def get_next_id(self):
        return max([t["id"] for t in self.tasks], default=0) + 1

    def find_task(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                return task
        return None

    def add_task(self, title, description=""):
        now = datetime.now().isoformat()

        new_task = {
            "id": self.get_next_id(),
            "title": title,
            "description": description,
            "status": "todo",
            "createdAt": now,
            "updatedAt": now
        }

        self.tasks.append(new_task)
        self.save_tasks()

    def list_tasks(self, status=None):
        valid_statuses = ["todo", "done", "in-progress"]

        if status and status not in valid_statuses:
            print("Nepostojeci status!")
            return

        filtered = [t for t in self.tasks if not status or t["status"] == status]

        if not filtered:
            print("Nema taskova za prikaz.")
            return

        for task in filtered:
            print(f"{task['id']}. {task['title']} [{task['status']}]")

    def mark_done(self, task_id):
        task = self.find_task(task_id)

        if not task:
            print("Task nije pronadjen")
            return

        task["status"] = "done"
        task["updatedAt"] = datetime.now().isoformat()
        self.save_tasks()
        print("Task zavrsen")

    def mark_in_progress(self, task_id):
        task = self.find_task(task_id)

        if not task:
            print("Task nije pronadjen")
            return

        if task["status"] == "done":
            print("Task je vec zavrsen!")
            return

        task["status"] = "in-progress"
        task["updatedAt"] = datetime.now().isoformat()
        self.save_tasks()
        print("Task prebacen u in-progress!")

    def update_title(self, task_id, title):
        task = self.find_task(task_id)

        if not task:
            print("Task nije pronadjen")
            return

        task["title"] = title
        task["updatedAt"] = datetime.now().isoformat()
        self.save_tasks()
        print("Task azuriran!")

    def delete_task(self, task_id):
        for i, task in enumerate(self.tasks):
            if task["id"] == task_id:
                del self.tasks[i]
                self.save_tasks()
                print("Task izbrisan!")
                return

        print("Task nije pronadjen")