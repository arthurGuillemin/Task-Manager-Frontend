import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks().then(data => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  return { tasks, loading };
};

export default useTasks;
