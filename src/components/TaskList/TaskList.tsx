import { useEffect, useState, useMemo } from "react";
import type { TaskListProps, Task } from "../../types";
import { TaskItem } from "./TaskItem";

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  const [searchTask, setSearchTask] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Task[]>([]);

  const isTyping = useMemo(() => searchTask !== debouncedQuery, [debouncedQuery, searchTask]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchTask);
      setFilteredData(
        searchTask
          ? tasks.filter((item) =>
              item.title.toLowerCase().includes(searchTask.toLowerCase())
            )
          : []
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTask, tasks]);

  const taskElement = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onStatusChange={onStatusChange}
      onDelete={onDelete}
      onEdit={onEdit} // pass edit handler
    />
  ));

  return (
  <div className="w-full max-w-4xl mx-auto px-4 flex flex-col gap-4">

    {/* Search */}
    <label htmlFor="searchTask" >
      Search Task
    </label>

    <input
      type="search"
      id="searchTask"
      placeholder="Search for Task"
      value={searchTask}
      onChange={(e) => setSearchTask(e.target.value)}
      className="border rounded-lg h-10 w-full bg-white px-3"
    />

    {isTyping && <p className="text-sm text-gray-500">Searching...</p>}

    {/* Search Results */}
    {filteredData.length > 0 && (
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">Search Results:</h2>

        <div className="flex flex-col gap-3">
          {filteredData.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    )}

    {/* All Tasks */}
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold text-lg">Tasks:</h1>

      <div className="flex flex-col gap-3">
        {taskElement}
      </div>
    </div>

  </div>
);
}

export default TaskList;