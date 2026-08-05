const FilterMenu = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 mb-6 w-full max-w-md mx-auto justify-center bg-gray-800 p-1 rounded-lg">
      <button
        onClick={() => setFilter("all")}
        className={`flex-1 py-2 rounded-md transition-all text-sm font-medium ${
          filter === "all"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`flex-1 py-2 rounded-md transition-all text-sm font-medium ${
          filter === "active"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Ongoing
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`flex-1 py-2 rounded-md transition-all text-sm font-medium ${
          filter === "completed"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterMenu;
