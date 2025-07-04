import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://task-manager-backend-a3c1.onrender.com/api";

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

export const createTask = async (data) => {
  console.log(data);
  
  const res = await axios.post(`${API_URL}/tasks`, data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, data);
  return res.data;
};
