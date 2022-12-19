import { Task } from '@/models';

/** Props to dialog add or edit task. */
export interface TaskModalProps {
  /** Is opened dialog. */
  isOpen: boolean;
  /** Handle close dialog. */
  handleClose: () => void;
  /** Task to edit optional. */
  task?: Task;
}
