const API_URL = "http://127.0.0.1:8000/tasks";

// 🔹 Učitaj taskove
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.title} [${task.status}]
            <button onclick="markDone(${task.id})">✔</button>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;

        list.appendChild(li);
    });
}

// 🔹 Dodaj task
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";
    loadTasks();
}

// 🔹 Mark done
async function markDone(id) {
    await fetch(`${API_URL}/${id}/done`, {
        method: "PATCH"
    });

    loadTasks();
}

// 🔹 Delete
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

// 🔹 Init
loadTasks();