import React from 'react';
import { ContentListTaskProps } from '@/models';
import { TaskCard } from '@/components';

/**
 * Component to contain list of tasks.
 *
 * @param prop ContentListTaskProps interface.
 * @param prop.tasks Tasks to list.
 * @returns React element component ContentListTask.
 */
const ContentListTask: React.FC<ContentListTaskProps> = ({
  tasks,
}): React.ReactElement => {
  return (
    <>
      {tasks && tasks.length ? (
        tasks.map((task) => (
          <div className="my-2" key={task.id}>
            <TaskCard task={task} />
          </div>
        ))
      ) : (
        <p className="text-center text-sm py-5 text-gray-600">
          There are no tasks to list.
        </p>
      )}
    </>
  );
};

export default ContentListTask;
