import React from 'react';
import { TaskCard } from '@/components';
import { StatusEnum, Task } from '@/models';
import { getNameByEnum } from '@/utils';

/** Interface props. */
interface ListTaskProps {
  /** List tasks to render. */
  tasks: Task[];
  /** Status of list tasks. */
  status: StatusEnum;
}

const ListTask: React.FC<ListTaskProps> = ({
  tasks,
  status,
}): React.ReactElement => {
  return (
    <div className="min-w-[240px] w-1/4 rounded border border-gray-300 shadow h-[calc(100vh-130px)] sm:h-[calc(100vh-100px)]">
      <div className={'w-full p-2 rounded text-center bg-' + status}>
        {getNameByEnum(status)}
      </div>
      <div className="p-2 h-[calc(100%-45px)] overflow-auto scrollbar">
        {tasks &&
          tasks.length &&
          tasks.map((task) => (
            <div className="my-2" key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        {((tasks && !tasks.length) || !tasks) && (
          <p className="text-center text-sm">There are no tasks to list.</p>
        )}
      </div>
    </div>
  );
};

export default ListTask;
