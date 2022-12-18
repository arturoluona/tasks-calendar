import { PriorityEnum, StatusEnum, Task, TasksByStatus } from '@/models';
import { Subject } from 'rxjs';

/** Subject to listen changes in input search. */
const searchTask$ = new Subject<string>();

/**
 * Emit search task.
 *
 * @param search String to search.
 */
const searchTask = (search: string) => {
  searchTask$.next(search.trim());
};

/**
 * Parse enum to get name.
 *
 * @param enums The enum to be parsed.
 * @returns String with name of enum.
 */
const getNameByEnum = (enums: PriorityEnum | StatusEnum): string => {
  const name: string = enums.split('-').join(' ');
  return name[0].toUpperCase() + name.slice(1);
};

/**
 * Group tasks by status.
 *
 * @param task The array of task to be parsed.
 * @param search Search tasks.
 * @returns Tasks grouped.
 */
const getTaskGroupedByStatusAndSearch = (
  task: Task[],
  search = ''
): TasksByStatus => {
  const tasks: Task[] = task.filter(
    ({ name, description }) =>
      name.includes(search) || description.includes(search)
  );
  return {
    [StatusEnum.Draft]: tasks.filter(
      ({ status }) => status === StatusEnum.Draft
    ),
    [StatusEnum.Todo]: tasks.filter(({ status }) => status === StatusEnum.Todo),
    [StatusEnum.Progress]: tasks.filter(
      ({ status }) => status === StatusEnum.Progress
    ),
    [StatusEnum.Completed]: tasks.filter(
      ({ status }) => status === StatusEnum.Completed
    ),
  };
};

/**
 * Parse string to get initials.
 *
 * @param name String to extract initials.
 * @returns String with initials.
 */
const getInitials = (name: string): string => {
  const nameTemp = name.split(' ');
  return (nameTemp[0][0] + (nameTemp[1] ? nameTemp[1][0] : '')).toUpperCase();
};

export {
  getNameByEnum,
  getTaskGroupedByStatusAndSearch,
  searchTask,
  searchTask$,
  getInitials,
};
