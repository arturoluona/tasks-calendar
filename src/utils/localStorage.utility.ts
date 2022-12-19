import { Task } from '@/models';

/**
 * Get local storage tasks.
 *
 * @returns Tasks array.
 */
const getLocalStorageTask = (): Task[] => {
  return localStorage.getItem('task')
    ? JSON.parse(localStorage.getItem('task') as string)
    : [];
};

/**
 * Set task to local storage.
 *
 * @param task Array of tasks to add to local storage.
 */
const setLocalStorageTask = (task: Task[]): void => {
  const tasks: string = JSON.stringify(task);
  localStorage.setItem('task', tasks);
};

export { getLocalStorageTask, setLocalStorageTask };
