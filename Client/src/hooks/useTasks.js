import { useEffect, useState } from "react";
import { getTasks  , createTask} from "../services/taskService";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks().then(data => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks(prev => [...prev, newTask]);
  };

  const editTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  };

  return { tasks, loading, addTask, editTask };
}