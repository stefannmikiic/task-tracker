import sys
import json

def load_tasks():
    try:
        with open("tasks.json", "r") as f:
            return json.load(f)
    except:
        return []

def save_tasks(tasks):
    with open("tasks.json", "w") as f:
        json.dump(tasks, f, indent=4)

def add_task(title):
    tasks = load_tasks()

    new_task = {
        "id": len(tasks) + 1,
        "title": title,
        "status": "todo"
    }

    tasks.append(new_task)
    save_tasks(tasks)

    print("Task dodat!")

def list_tasks():
    tasks = load_tasks()

    for task in tasks:
        print(f"{task['id']}. {task['title']} [{task['status']}]")

def mark_done(id: int):
    tasks = load_tasks()
    found = False
    for task in tasks:
        if task['id'] == id:
            task['status']= "done"
            found = True
            break
    if not found:
        return print("Task nije pronadjen")
    save_tasks(tasks)
    print("Task zavrsen")

def update_title(id: int, title: str):
    tasks = load_tasks()
    found = False
    for task in tasks:
        if task['id'] == id:
            task['title']= title
            found = True
            break
    if not found:
        return print("Task nije pronadjen")
    save_tasks(tasks)
    print("Task azuriran!")

def main():
    command = sys.argv[1]

    if command == "add":
        title = sys.argv[2]
        add_task(title)
    elif command == "list":
        list_tasks()
    elif command == "done":
        if len(sys.argv) < 3:
            print("Unesi ID taska!")
            return
        try:
            id = int(sys.argv[2])
        except ValueError:
            print("ID mora biti broj!")
            return
        mark_done(id)
    elif command == "update":
        if len(sys.argv) < 4:
            print("Unesi naziv taska")
            return
        try:
            task_id = int(sys.argv[2])
            updated_title = " ".join(sys.argv[3:])
        except ValueError:
            print("ID mora biti broj!")
            return
        update_title(task_id,updated_title)
    else:
        print("Nepoznata komanda")

if __name__ == "__main__":
    main()