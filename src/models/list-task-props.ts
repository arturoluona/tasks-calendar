import { Task, StatusEnum } from '@/models';

/** Interface props ListTask. */
export interface ListTaskProps {
  /** List tasks to render. */
  tasks: Task[];
  /** Status of list tasks. */
  status: StatusEnum;
}
