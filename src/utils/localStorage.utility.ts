import { Task } from '@/models';

/**
 * Get local storage tasks.
 *
 * @returns Tasks array.
 */
export function getLocalStorageTask(): Task[] {
  return localStorage.getItem('task')
    ? JSON.parse(localStorage.getItem('task') as string)
    : [];
}

/**
 * Set task to local storage.
 *
 * @param task Array of tasks to add to local storage.
 */
export function setLocalStorageTask(task: Task[]): void {
  const tasks: string = JSON.stringify(task);
  localStorage.setItem('task', tasks);
}
