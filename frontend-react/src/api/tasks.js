import axios from "axios";

const API = "http://127.0.0.1:8000/tasks";

export const getTasks = () => axios.get(API);
export const createTask = (data) => axios.post(API, data);
export const deleteTask = (id) => axios.delete(`${API}/${id}`);
export const markDone = (id) => axios.patch(`${API}/${id}/done`);
export const markProgress = (id) => axios.patch(`${API}/${id}/progress`);
export const updateTask = (id, data) => axios.put(`${API}/${id}`, data);