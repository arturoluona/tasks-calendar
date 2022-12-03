import { PriorityEnum, StatusEnum } from '@/models';

/** Task interface. */
export interface Task {
  /** Id of task. */
  id: string;
  /** Name of task. */
  name: string;
  /** Description of task. */
  description: string;
  /** Created date of task. */
  date: string;
  /** Status of task. */
  status: StatusEnum;
  /** Priority of task. */
  priority: PriorityEnum;
}
