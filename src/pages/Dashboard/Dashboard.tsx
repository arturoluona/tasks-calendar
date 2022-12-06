import React, { useState } from 'react';
import { ListTask, TaskCard } from '@/components';
import { tasks } from '@/utils';
import { StatusEnum, Task } from '@/models';
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core/dist/types';

const Dashboard = () => {
  const [listTask, setListTask] = useState<Task[]>(tasks);
  const [activeIndex, setActiveIndex] = useState<string | number | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) =>
    setActiveIndex(active.id);

  const handleDragCancel = () => setActiveIndex(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }
    const activeContainer = active?.data?.current?.sortable?.containerId;
    const overContainer = over?.data?.current?.sortable?.containerId || over.id;
    activeContainer !== overContainer &&
      moveBetweenContainers(active?.id || '', overContainer);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveIndex(null);
      return;
    }
    if (active.id !== over.id) {
      const activeContainer = active?.data?.current?.sortable.containerId;
      const overContainer =
        over?.data?.current?.sortable.containerId || over.id;
      const activeId = active?.data?.current?.sortable.index;
      const overIndex = over?.data?.current?.sortable.index;
      const index = listTask.findIndex(({ id }) => id === activeId);
      if (activeContainer === overContainer) {
        setListTask(arrayMove(listTask, index, overIndex));
      } else {
        moveBetweenContainers(active?.id || '', overContainer);
      }
    }
    setActiveIndex(null);
  };

  const moveBetweenContainers = (
    activeId: string | number,
    overContainer: StatusEnum
  ) => {
    setListTask((tasksList) => {
      const index = tasksList.findIndex(({ id }) => id === activeId);
      const task: Task = tasksList[index];
      task.status = overContainer;
      return [
        ...tasksList.slice(0, index),
        task,
        ...tasksList.slice(index + 1),
      ];
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className=" flex flex-col sm:flex-row gap-0 sm:gap-3 h-full p-5 scrollbar overflow-x-auto overflow-y-hidden">
        <ListTask
          tasks={listTask.filter((task) => task.status === StatusEnum.Draft)}
          status={StatusEnum.Draft}
        />
        <ListTask
          tasks={listTask.filter((task) => task.status === StatusEnum.Todo)}
          status={StatusEnum.Todo}
        />
        <ListTask
          tasks={listTask.filter((task) => task.status === StatusEnum.Progress)}
          status={StatusEnum.Progress}
        />
        <ListTask
          tasks={listTask.filter(
            (task) => task.status === StatusEnum.Completed
          )}
          status={StatusEnum.Completed}
        />
      </div>
      <DragOverlay>
        {activeIndex ? (
          <TaskCard
            task={listTask.find(({ id }) => id === activeIndex) as Task}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Dashboard;
