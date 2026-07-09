const TaskList = ({ filteredTasks, toggleTask, deleteTask }) => {
  <ul className="w-full max-w-md flex flex-col gap-3">
    {filteredTasks.length === 0 && (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">Buralar şimdilik çok ıssız...</p>
        <p className="text-sm mt-1">
          Yeni bir görev ekleyerek başlayabilirsin.
        </p>
      </div>
    )}

    {filteredTasks.map((task) => (
      <li
        key={task.id}
        className={`flex items-center bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 transition-all ${
          task.is_completed ? "opacity-60" : "hover:border-blue-500"
        }`}
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={!!task.is_completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 accent-blue-500 cursor-pointer"
        />

        {/* Görev Metni */}
        <span
          className={`flex-1 ml-4 text-lg transition-colors ${
            task.is_completed ? "line-through text-gray-500" : "text-gray-200"
          }`}
        >
          {task.title}
        </span>

        {/* Silme Butonu */}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>;
};

export default TaskList;
