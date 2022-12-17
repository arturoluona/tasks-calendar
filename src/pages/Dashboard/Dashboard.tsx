import React, { useEffect, useState } from 'react';
import { ListTask, TaskCard } from '@/components';
import { getTaskGroupedByStatus } from '@/utils';
import { AppStore, StatusEnum, Task, TasksByStatus } from '@/models';
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { useDispatch, useSelector } from 'react-redux';
import { sortTask, updateTask } from '@/redux/states/task';

const Dashboard: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector((state: AppStore) => state.task);
  const [listTask, setListTask] = useState<TasksByStatus>(
    getTaskGroupedByStatus(tasks)
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    setListTask(getTaskGroupedByStatus(tasks));
  }, [tasks]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeContainer = active?.data?.current?.sortable?.containerId;
    const task: Task | undefined = listTask[activeContainer as StatusEnum].find(
      ({ id }) => id === active.id
    );
    task && setActiveTask(task);
  };

  const handleDragCancel = () => setActiveTask(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (over?.id) {
      const activeContainer = active?.data?.current?.sortable?.containerId;
      const overContainer =
        over?.data?.current?.sortable?.containerId || over.id;
      activeContainer !== overContainer && moveBetweenContainers(overContainer);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeContainer = active?.data?.current?.sortable.containerId;
      const overContainer =
        over?.data?.current?.sortable.containerId || over.id;
      const activeIndex = active?.data?.current?.sortable.index;
      const overIndex =
        over.id in listTask
          ? listTask[overContainer as StatusEnum].length + 1
          : over?.data?.current?.sortable?.index;

      if (activeContainer === overContainer) {
        const sortByStatus: TasksByStatus = {
          ...listTask,
          [overContainer as StatusEnum]: arrayMove(
            listTask[overContainer as StatusEnum],
            activeIndex,
            overIndex
          ),
        };
        setListTask(sortByStatus);
        dispatch(
          sortTask([
            ...sortByStatus[StatusEnum.Draft],
            ...sortByStatus[StatusEnum.Completed],
            ...sortByStatus[StatusEnum.Progress],
            ...sortByStatus[StatusEnum.Todo],
          ])
        );
      } else {
        moveBetweenContainers(overContainer);
      }
    }
    setActiveTask(null);
  };

  const moveBetweenContainers = (overContainer: StatusEnum) => {
    dispatch(updateTask({ ...activeTask, status: overContainer } as Task));
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className=" flex flex-col sm:flex-row gap-0 sm:gap-3 h-full p-5 scrollbar overflow-x-auto overflow-y-hidden">
        <ListTask
          tasks={listTask[StatusEnum.Draft]}
          status={StatusEnum.Draft}
        />
        <ListTask tasks={listTask[StatusEnum.Todo]} status={StatusEnum.Todo} />
        <ListTask
          tasks={listTask[StatusEnum.Progress]}
          status={StatusEnum.Progress}
        />
        <ListTask
          tasks={listTask[StatusEnum.Completed]}
          status={StatusEnum.Completed}
        />
      </div>
      <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>
    </DndContext>
  );
};

export default Dashboard;
