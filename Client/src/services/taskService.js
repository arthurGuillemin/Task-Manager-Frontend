import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://task-manager-backend-a3c1.onrender.com/api";

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};
