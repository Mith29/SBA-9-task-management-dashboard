import { useEffect, useState, useMemo } from "react";
import type { TaskStatus } from "../../types";
import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";
import type { Task } from "../../types";

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps){

    const [searchTask, setSearchTask] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [filteredData, setFilteredData] = useState<Task[]>([]);

    const isTyping = useMemo(() => {
    if (searchTask === debouncedQuery) {
      return false;
    } else {
      return true;
    }
  }, [debouncedQuery, searchTask]);

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setDebouncedQuery(()=> searchTask);
            setFilteredData(searchTask? tasks.filter(item=> item.title.toLowerCase().includes(searchTask.toLowerCase())) :[])

            
        }, 500);
        return () => {
      clearTimeout(timer);
    };

    },[searchTask]);

    function handleStatusChange (taskId: string, taskStatus: TaskStatus) {
        onStatusChange(taskId,taskStatus);
    }

    function handleDelete (taskId: string ) {
        onDelete(taskId);
    }

    const taskElement = tasks.map((task) => <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />);

    return (
        <>
        <input type="search" 
        value={searchTask} 
        onChange={(e)=>setSearchTask(e.target.value)} 
        id="searchTask" 
        placeholder="Search for task..." />
        {isTyping && <p>Searching...</p>}
      {filteredData.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}

        <h1 className="font-semibold">Tasks:</h1>
            {taskElement}
        </>
    )
}

export default TaskList;