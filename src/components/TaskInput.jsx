const TaskInput = ({ inputValue, setInputValue, addTask }) => {
  return (
    <div className="flex w-full max-w-md mb-8 shadow-lg">
      <input
        type="text"
        placeholder="Add Task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
      />
      <button
        onClick={addTask}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-r-lg transition-colors"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
