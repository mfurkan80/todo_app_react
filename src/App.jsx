import { useEffect, useState } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import FilterMenu from "./components/FilterMenu";
import TaskList from "./components/TaskList";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.is_completed;
    if (filter === "completed") return task.is_completed;
    return true;
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.log("Veriler çekilirken hata oluştu: ", error);
    }
  };

  const addTask = async () => {
    if (!inputValue.trim()) return;

    try {
      await axios.post(API_URL, { title: inputValue });
      setInputValue("");
      fetchTasks();
    } catch (error) {
      console.log("Eklenirken hata oluştu: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Silinirken hata oluştu: ", error);
    }
  };

  const toggleTask = async (id) => {
    // Önce o anki görevin durumunu diziden buluyoruz
    const currentTask = tasks.find((t) => t.id === id);
    if (!currentTask) return;

    try {
      await axios.patch(`${API_URL}/${id}`, {
        is_completed: !currentTask.is_completed,
      });
      fetchTasks();
    } catch (error) {
      console.log("Güncellenirken hata oluştu: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Tasks</h1>

      <TaskInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTask={addTask}
      />

      <FilterMenu filter={filter} setFilter={setFilter} />

      <TaskList
        filteredTasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
