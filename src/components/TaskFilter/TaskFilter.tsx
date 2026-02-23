// // types/index.ts
// export interface TaskFilterProps {
//   onFilterChange: (filters: {
//     status?: TaskStatus;
//     priority?: 'low' | 'medium' | 'high';
//   }) => void;
// }

import type { TaskFilterProps, TaskStatus } from "../../types";

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  function handleStatusChange(e : React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange({status: e.target.value as TaskStatus});
  }
 function handlePriorityChange(e : React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange({priority: e.target.value as 'low' | 'medium' | 'high'});
  }
  
  return (
    <>
      <select
       
        onChange={handleStatusChange}
        defaultValue="All Statuses"
      >
        <option value="" >All Statuses</option>

        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select defaultValue="All Priorities" onChange={handlePriorityChange}>
                <option value="">All Priorities</option>

        <option value="low">low</option>
        <option value="medium">mediu m</option>
        <option value="high">high</option>
      </select>
    </>
  );
}
export default TaskFilter;
