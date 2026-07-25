import { useEffect, useState } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import FilterMenu from "./components/FilterMenu";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import { useLoaderData } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(true);

  /*const [tasks, setTasks] = useState([]);*/
  const tasks = useLoaderData();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.is_completed;
    if (filter === "completed") return task.is_completed;
    return true;
  });

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  /* const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      setTasks(response.data);
    } catch (error) {
      console.log("Veriler çekilirken hata oluştu: ", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleLogout();
      }
    }
  }; */

  /* const addTask = async () => {
    if (!inputValue.trim()) return;
    try {
      // Veri objesinden sonra virgül koyup bileti ekliyoruz
      await axios.post(API_URL, { title: inputValue }, getAuthHeaders());
      setInputValue("");
      //fetchTasks();
    } catch (error) {
      console.log("Eklenirken hata oluştu: ", error);
    }
  }; */

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      //fetchTasks();
    } catch (error) {
      console.log("Silinirken hata oluştu: ", error);
    }
  };

  const toggleTask = async (id) => {
    const currentTask = tasks.find((t) => t.id === id);
    if (!currentTask) return;
    try {
      await axios.patch(
        `${API_URL}/${id}`,
        {
          is_completed: !currentTask.is_completed,
        },
        getAuthHeaders(),
      );
      //fetchTasks();
    } catch (error) {
      console.log("Güncellenirken hata oluştu: ", error);
    }
  };

  /* useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);*/

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    Navigate("/");
  };

  /* if (!token) {
    if (showLogin) {
      return <Login setToken={setToken} onSwitch={() => setShowLogin(false)} />;
    } else {
      return <Register onSwitch={() => setShowLogin(true)} />;
    }
  } */

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      {/* Şık bir üst bar ve çıkış yap butonu ekleyelim */}
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
      <TaskList
        filteredTasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export const dashboardLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) return []; // Giriş yapılmamışsa boş liste dön

  try {
    const response = await axios.get(import.meta.env.VITE_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Loader Hatası (Veri çekilemedi):", error);
    return [];
  }
};

// 2. Gerçek API'ye Veri Gönderme/Silme/Güncelleme (Action)
export const dashboardAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  // Token yoksa işlemi durdur
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
      // Form'dan gelen değer string'dir, boolean'a çeviriyoruz
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

  return null; // İşlem bitince React Router otomatik olarak loader'ı tekrar tetikler
};

export default App;
