import { useState } from "react";
import { Form } from "react-router";

const TaskInput = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Form
      method="post"
      className="w-full max-w-xl px-4 flex gap-2 mb-6"
      onSubmit={() => {
        setTimeout(() => setInputValue(""), 10);
      }}
    >
      <input type="hidden" name="intent" value="add" />

      <input
        type="text"
        name="title"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-colors"
      >
        Add
      </button>
    </Form>
  );
};

export default TaskInput;
