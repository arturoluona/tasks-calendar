import React from 'react';
import { TaskCard } from '@/components';
import { Task } from '@/models';

/** Interface props. */
interface ListTaskProps {
  /** List tasks to render. */
  tasks: Task[];
}

const ListTask: React.FC<ListTaskProps> = ({ tasks }): React.ReactElement => {
  return (
    <div className="rounded border border-gray-300 p-2 shadow h-full">
      {tasks &&
        tasks.length &&
        tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      {((tasks && !tasks.length) || !tasks) && (
        <p className="text-center text-sm">There are no tasks to list.</p>
      )}
    </div>
  );
};

export default ListTask;
