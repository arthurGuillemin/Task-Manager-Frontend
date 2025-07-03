import useTasks from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

const Home = () => {
  const { tasks, loading } = useTasks();

  if (loading) return <Loader />;

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Home;
