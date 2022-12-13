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
 * @param task The task to add to local storage.
 */
export function setLocalStorageTask(task: Task): void {
  const tasks: string = JSON.stringify([...getLocalStorageTask(), task]);
  localStorage.setItem('task', tasks);
}
