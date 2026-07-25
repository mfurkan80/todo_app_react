import { useFetcher, useLoaderData } from "react-router";

const TaskItem = ({ task }) => {
  const fetcher = useFetcher();

  return (
    <div className="flex items-center justify-between bg-[#1e293b] p-4 rounded-lg border border-gray-700 mb-3">
      {/* Tamamlama (Toggle) İşlemi */}
      <div className="flex items-center gap-3">
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="toggle" />
          <input type="hidden" name="id" value={task.id} />

          {/* Backend'e yeni durumu iletmek için eklediğimiz satır: */}
          <input type="hidden" name="new_status" value={!task.is_completed} />

          <input
            type="checkbox"
            checked={task.is_completed}
            className="w-5 h-5 cursor-pointer rounded border-gray-600 bg-gray-700"
            onChange={(e) => e.target.form.requestSubmit()}
          />
        </fetcher.Form>
        <span
          className={
            task.is_completed ? "line-through text-gray-500" : "text-gray-200"
          }
        >
          {task.title}
        </span>
      </div>

      {/* Silme (Delete) İşlemi */}
      <fetcher.Form method="post">
        <input type="hidden" name="intent" value="delete" />
        <input type="hidden" name="id" value={task.id} />
        <button
          type="submit"
          className="text-red-400 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 px-4 py-1.5 rounded transition-colors"
        >
          Delete
        </button>
      </fetcher.Form>
    </div>
  );
};

// 2. LİSTE BİLEŞENİ (Döngüyü kurduğumuz asıl yer)
const TaskList = () => {
  // Router'ın Loader'ından verileri çekiyoruz
  const tasks = useLoaderData();

  // Eğer henüz hiç görev yoksa
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-gray-400 mt-4 text-center">
        No tasks found. Add one above!
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      {/* Görev dizisini dönüp her biri için bir TaskItem oluşturuyoruz */}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
