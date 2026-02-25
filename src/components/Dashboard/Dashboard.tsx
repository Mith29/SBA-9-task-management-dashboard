import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import { sortTasks, exportTasks, importTasks } from "../../utils/taskUtils";
import type { SortType } from "../../utils/taskUtils";
import { ArrowDownTrayIcon , ArrowDownIcon } from "@heroicons/react/16/solid";

type Filter = {
  status?: TaskStatus | "";
  priority?: "low" | "medium" | "high" | "";
};

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Filter>({ status: "", priority: "" });
  const [sortBy, setSortBy] = useState<SortType>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(taskData: Omit<Task, "id">) {
    const newTask: Task = { id: Date.now().toString(), ...taskData };
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  }

  function handleEditTask(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  function handleDelete(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function handleStatusChange(taskId: string, taskStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: taskStatus } : task))
    );
  }

  function handleFilterChange(newFilters: Filter) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  const sortedTasks = sortBy === "" ? filteredTasks : sortTasks(filteredTasks, sortBy);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inprogress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
    <div className="max-w-5xl mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800">
          Task Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Manage, track and organize your tasks efficiently
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="bg-sky-600 hover:bg-sky-700 transition text-white px-6 py-2 rounded-lg shadow-md"
        >
          Add New Task
        </button>

        <button
          onClick={() => exportTasks(tasks)}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition text-white px-6 py-2 rounded-lg shadow-md"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Export Tasks
        </button>

        <button
          type="button"
          onClick={() => document.getElementById("import-file")?.click()}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition text-white px-6 py-2 rounded-lg shadow-md"
        >
          <ArrowDownIcon className="h-5 w-5" />
          Import Tasks
        </button>

        <input
          id="import-file"
          type="file"
          accept="application/json"
          onChange={(e) => importTasks(e, setTasks)}
          className="hidden"
        />
      </div>

      {/* Form Modal Style */}
      {showForm && (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-fit mx-auto">
          <TaskForm
            onAddTask={handleAddTask}
            taskToEdit={editingTask || undefined}
            onEditTask={(task) => {
              handleEditTask(task);
              setEditingTask(null);
              setShowForm(false);
            }}
            onClose={() => {
              setEditingTask(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* Filters + Sort */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <TaskFilter onFilterChange={handleFilterChange} />

        <div className="flex flex-col gap-2">
          <label htmlFor="sort" className="font-semibold text-slate-700">
            Sort Tasks
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "title" | "dueDate" | "")
            }
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-slate-500 text-sm">Total</p>
          <p className="text-xl font-bold text-slate-800">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-slate-500 text-sm">Completed</p>
          <p className="text-xl font-bold text-green-600">{stats.completed}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-slate-500 text-sm">In Progress</p>
          <p className="text-xl font-bold text-blue-600">{stats.inprogress}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-slate-500 text-sm">Pending</p>
          <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
        </div>
      </div>

      {/* Task List Section */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <TaskList
          tasks={sortedTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  </div>
);
}

export default Dashboard;