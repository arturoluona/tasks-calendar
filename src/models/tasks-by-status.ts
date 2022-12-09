import { Task, StatusEnum } from '@/models';

/** Tasks by status. */
export interface TasksByStatus {
  /** Draft tasks. */
  [StatusEnum.Draft]: Task[];
  /** To-do tasks. */
  [StatusEnum.Todo]: Task[];
  /** Progress tasks. */
  [StatusEnum.Progress]: Task[];
  /** Completed tasks. */
  [StatusEnum.Completed]: Task[];
}
