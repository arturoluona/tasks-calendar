import React, { useEffect, useState } from 'react';
import { ListTask, TaskCard } from '@/components';
import { getTaskGroupedByStatusAndSearch, searchTask$ } from '@/utils';
import { AppStore, StatusEnum, Task, TasksByStatus } from '@/models';
import {
  DndContext,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { useDispatch, useSelector } from 'react-redux';
import { sortTask, updateTask } from '@/redux/states/task';

/**
 * Dashboard page.
 *
 * @returns React element Dashboard.
 */
const Dashboard: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector((state: AppStore) => state.task);
  const [listTask, setListTask] = useState<TasksByStatus>(
    getTaskGroupedByStatusAndSearch(tasks)
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setListTask(getTaskGroupedByStatusAndSearch(tasks, search));
  }, [tasks, search]);

  useEffect(() => {
    subscribeSearchTask$();
  }, []);

  /**
   * Subscribe to search tasks.
   */
  const subscribeSearchTask$ = (): void => {
    searchTask$.subscribe((searchS) => {
      setSearch(searchS);
    });
  };

  /**
   * Start Drag and Drop.
   *
   * @param param DragStartEvent interface.
   * @param param.active Active element.
   */
  const handleDragStart = ({ active }: DragStartEvent): void => {
    const activeContainer = active?.data?.current?.sortable?.containerId;
    const task: Task | undefined = listTask[activeContainer as StatusEnum].find(
      ({ id }) => id === active.id
    );
    task && setActiveTask(task);
  };

  /**
   * Cancel Drag and Drop.
   */
  const handleDragCancel = (): void => {
    setActiveTask(null);
  };

  /**
   * While make Drag and Drop.
   *
   * @param param DragStartEvent interface.
   * @param param.active Active element.
   * @param param.over Over element.
   */
  const handleDragOver = ({ active, over }: DragOverEvent): void => {
    if (over?.id) {
      const activeContainer = active?.data?.current?.sortable?.containerId;
      const overContainer =
        over?.data?.current?.sortable?.containerId || over.id;
      activeContainer !== overContainer && moveBetweenContainers(overContainer);
    }
  };

  /**
   * End Drag and Drop (Sort or move task between containers).
   *
   * @param param DragStartEvent interface.
   * @param param.active Active element.
   * @param param.over Over element.
   */
  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
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

  /**
   * Move task between containers from action store.
   *
   * @param overContainer Container moved.
   */
  const moveBetweenContainers = (overContainer: StatusEnum): void => {
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
