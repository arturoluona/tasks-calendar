import React, { useEffect, useState } from 'react';
import { ListTask, TaskCard } from '@/components';
import { tasks } from '@/utils';
import { StatusEnum, Task, TasksByStatus } from '@/models';
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
  const [listTask, setListTask] = useState<TasksByStatus>({
    [StatusEnum.Draft]: [],
    [StatusEnum.Todo]: [],
    [StatusEnum.Progress]: [],
    [StatusEnum.Completed]: [],
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const setParsedTasks = () => {
    setListTask({
      [StatusEnum.Draft]: tasks.filter(
        (task) => task.status === StatusEnum.Draft
      ),
      [StatusEnum.Todo]: tasks.filter(
        (task) => task.status === StatusEnum.Todo
      ),
      [StatusEnum.Progress]: tasks.filter(
        (task) => task.status === StatusEnum.Progress
      ),
      [StatusEnum.Completed]: tasks.filter(
        (task) => task.status === StatusEnum.Completed
      ),
    });
  };

  useEffect(() => {
    setParsedTasks();
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
    const overId = over?.id;
    if (!overId) {
      return;
    }
    const activeContainer = active?.data?.current?.sortable?.containerId;
    const overContainer = over?.data?.current?.sortable?.containerId || over.id;
    const activeIndex = active?.data?.current?.sortable?.index;
    const overIndex =
      over.id in listTask
        ? listTask[overContainer as StatusEnum].length + 1
        : over?.data?.current?.sortable?.index;

    activeContainer !== overContainer &&
      moveBetweenContainers(
        activeContainer,
        activeIndex,
        overContainer,
        overIndex
      );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveTask(null);
      return;
    }
    if (active.id !== over.id) {
      const activeContainer = active?.data?.current?.sortable.containerId;
      const overContainer =
        over?.data?.current?.sortable.containerId || over.id;
      const activeIndex = active?.data?.current?.sortable.index;
      const overIndex =
        over.id in listTask
          ? listTask[overContainer as StatusEnum].length + 1
          : over?.data?.current?.sortable?.index;

      if (activeContainer === overContainer) {
        setListTask({
          ...listTask,
          [overContainer as StatusEnum]: arrayMove(
            listTask[overContainer as StatusEnum],
            activeIndex,
            overIndex
          ),
        });
      } else {
        moveBetweenContainers(
          activeContainer,
          activeIndex,
          overContainer,
          overIndex
        );
      }
    }
    setActiveTask(null);
  };

  const moveBetweenContainers = (
    activeContainer: StatusEnum,
    activeIndex: number,
    overContainer: StatusEnum,
    overId: number
  ) => {
    setListTask({
      ...listTask,
      [activeContainer]: [
        ...listTask[activeContainer].slice(0, activeIndex),
        ...listTask[activeContainer].slice(activeIndex + 1),
      ],
      [overContainer]: [
        ...listTask[overContainer].slice(0, overId),
        { ...activeTask, status: overContainer },
        ...listTask[overContainer].slice(overId),
      ],
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
