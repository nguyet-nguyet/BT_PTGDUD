import { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';

const getInitialTasks = () => {
  const stored = localStorage.getItem('tasks');
  return stored
    ? JSON.parse(stored)
    : [
        { id: 1, text: 'Nhập thêm bút bi vào kho', completed: false },
        { id: 2, text: 'Kiểm tra số lượng sách vở', completed: true },
      ];
};

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newItem = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📝 Quản lý công việc cửa hàng
        </h1>

        {/* Input và nút Thêm */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            className="flex-1 border border-blue-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Thêm công việc như kiểm kho, nhập hàng..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold shadow-sm"
          >
            ➕ Thêm
          </button>
        </div>

        {/* Các nút lọc */}
        <div className="flex gap-2 justify-center mb-6">
          {['all', 'completed', 'incomplete'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {f === 'all'
                ? 'Tất cả'
                : f === 'completed'
                ? 'Đã hoàn thành'
                : 'Chưa hoàn thành'}
            </button>
          ))}
        </div>

        {/* Danh sách công việc */}
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </ul>

        {/* Thống kê */}
        <div className="mt-6 text-center text-gray-700 text-sm">
          Tổng: <strong>{total}</strong> công việc, Đã hoàn thành:{' '}
          <strong>{completed}</strong>
        </div>
      </div>
    </div>
  );
}
