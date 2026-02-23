
import { useState } from 'react'

import type { TaskStatus } from '../../types';
import { TaskList } from '../TaskList/TaskList'; 

import TaskFilter from '../TaskFilter/TaskFilter';



type Filter = {
  status?: TaskStatus | "";
  priority?: 'low' | 'medium' | 'high' | "";
};
function Dashboard() {

    // const [tasks,setTasks] = useState ([]);
    const [filters, setFilters] = useState({status: "", priority:""})
    function handleStatusChange (taskId: string, taskStatus: TaskStatus) {
        setTasks((prev) => 
            prev.map((task) => {
                if(task.id === taskId){
                    return {...task, status: taskStatus}; 
                }
                else{
                    return task
                };
            })
        );
    }

    function handleDelete (taskId: string) {
        setTasks((prev) =>
            prev.filter((task) =>
                task.id !== taskId)
        )
    }

   function handleFilterChange(newFilters: Filter) {
  setFilters(prev => ({
    ...prev,
    ...newFilters
  }));
}
const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

    return (
        <>
        <TaskFilter onFilterChange={handleFilterChange}/>
        <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        </>
    )

}

export default Dashboard;