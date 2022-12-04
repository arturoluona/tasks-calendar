import React from 'react';
import { ListTask } from '@/components';
import { tasks } from '@/utils';
import { StatusEnum } from '@/models';

// TODO: react-dnd || @dnd-kit/core

const Dashboard = () => {
  return (
    <div className=" flex flex-col sm:flex-row gap-0 sm:gap-3 h-full p-5 scrollbar overflow-x-auto overflow-y-hidden">
      <ListTask
        tasks={tasks.filter((task) => task.status === StatusEnum.Draft)}
        status={StatusEnum.Draft}
      />
      <ListTask
        tasks={tasks.filter((task) => task.status === StatusEnum.Todo)}
        status={StatusEnum.Todo}
      />
      <ListTask
        tasks={tasks.filter((task) => task.status === StatusEnum.Progress)}
        status={StatusEnum.Progress}
      />
      <ListTask
        tasks={tasks.filter((task) => task.status === StatusEnum.Completed)}
        status={StatusEnum.Completed}
      />
    </div>
  );
};

export default Dashboard;
