import axios from "axios";
import { useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router"; // useNavigate eklendi
import FilterMenu from "./components/FilterMenu";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const App = () => {
  const tasks = useLoaderData();
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate(); // Yönlendirme kancasını başlattık

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.is_completed;
    if (filter === "completed") return task.is_completed;
    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token'ı çöpe at
    setToken(null);
    navigate("/"); // React Router'a "Login sayfasına git" emrini ver
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <div className="w-full max-w-xl flex justify-between items-center mb-8 px-4">
        <h1 className="text-4xl font-bold text-blue-400">Tasks</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold"
        >
          Çıkış Yap
        </button>
      </div>

      <TaskInput />
      <FilterMenu filter={filter} setFilter={setFilter} />
      <TaskList filteredTasks={filteredTasks} />
    </div>
  );
};

// --- App Componentinin Bitişi ---

export const dashboardLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/tasks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Loader Hatası (Veri çekilemedi):", error);

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      return redirect("/");
    }

    return [];
  }
};

export const dashboardAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = localStorage.getItem("token");
  const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

  if (!token) return null;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    if (intent === "add") {
      const title = formData.get("title");
      await axios.post(API_URL, { title }, config);
    } else if (intent === "delete") {
      const id = formData.get("id");
      await axios.delete(`${API_URL}/${id}`, config);
    } else if (intent === "toggle") {
      const id = formData.get("id");
      const newStatus = formData.get("new_status") === "true";
      await axios.patch(
        `${API_URL}/${id}`,
        { is_completed: newStatus },
        config,
      );
    }
  } catch (error) {
    console.error("Action Hatası (İşlem yapılamadı):", error);
  }

  return null;
};

export default App;
