import { PriorityEnum, StatusEnum, Task, TasksByStatus } from '@/models';
import { Subject } from 'rxjs';

const searchTask$ = new Subject<string>();

/**
 * Emit search task.
 *
 * @param search String to search.
 */
function searchTask(search: string) {
  searchTask$.next(search.trim());
}

/**
 * Parse enum to get name.
 *
 * @param enums The enum to be parsed.
 * @returns String with name of enum.
 */
function getNameByEnum(enums: PriorityEnum | StatusEnum): string {
  const name: string = enums.split('-').join(' ');
  return name[0].toUpperCase() + name.slice(1);
}

/**
 * Group tasks by status.
 *
 * @param task The array of task to be parsed.
 * @param search Search tasks.
 * @returns Tasks grouped.
 */
function getTaskGroupedByStatusAndSearch(
  task: Task[],
  search = ''
): TasksByStatus {
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
}

export {
  getNameByEnum,
  getTaskGroupedByStatusAndSearch,
  searchTask,
  searchTask$,
};
