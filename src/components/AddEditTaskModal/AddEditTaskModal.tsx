import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { PriorityEnum, StatusEnum, Task } from '@/models';
import { getNameByEnum } from '@/utils';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '@/redux/states/task';
import { TaskModalProps } from '@/models/task-modal-props';
import { FormikValues } from 'formik/dist/types';

const validationSchema = yup.object({
  name: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

/**
 * Component modal to edit or add new task.
 *
 * @param prop TaskModalProps interface.
 * @param prop.isOpen Is open or close the dialog.
 * @param prop.task Task optional to edit.
 * @param prop.handleClose Handle close dialog.
 * @returns React element component AddEditTaskModal.
 */
const AddEditTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  handleClose,
}): React.ReactElement => {
  const dispatch = useDispatch();

  /**
   * Save task, toggle edit or add new.
   *
   * @param valueTask Values of task to save.
   */
  const saveTask = (valueTask: Task): void => {
    task && task.id ? editTask(valueTask) : addNewTask(valueTask);
    closeDialog();
  };

  /**
   * Add new task from action store.
   *
   * @param valueTask Values of task to save.
   */
  const addNewTask = (valueTask: Task): void => {
    dispatch(
      addTask({
        ...valueTask,
        date: valueTask.date?.toLocaleString(),
      })
    );
  };

  /**
   * Edit task from action store.
   *
   * @param valueTask Values of task to save.
   */
  const editTask = (valueTask: Task): void => {
    dispatch(
      updateTask({
        ...valueTask,
        date: valueTask.date?.toLocaleString(),
        id: task?.id as string,
      })
    );
  };

  const formik: FormikValues = useFormik({
    initialValues: {
      name: task?.name || '',
      description: task?.description || '',
      date: dayjs(task?.date || new Date()),
      status: task?.status || StatusEnum.Draft,
      priority: task?.priority || PriorityEnum.Low,
    } as Task,
    validationSchema,
    onSubmit: saveTask,
  });

  /** Toggle hide or show modal. */
  const closeDialog = (): void => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogTitle>{task?.id ? 'Edit' : 'Add'} new task</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            classes={{ root: 'form-field' }}
            fullWidth
            autoComplete="off"
            id="name"
            label="Title"
            size="small"
            placeholder="Take the dog out"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            classes={{ root: 'form-field' }}
            fullWidth
            autoComplete="off"
            multiline
            rows={4}
            id="description"
            label="Description"
            size="small"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={formik.values.date}
              onChange={(date) => formik.setFieldValue('date', date)}
              renderInput={(params) => (
                <TextField
                  classes={{ root: 'form-field' }}
                  fullWidth
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              className={'form-field'}
              fullWidth
              name="status"
              labelId="status-label"
              id="status"
              label="Status"
              size="small"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value={StatusEnum.Draft}>
                {getNameByEnum(StatusEnum.Draft)}
              </MenuItem>
              <MenuItem value={StatusEnum.Todo}>
                {getNameByEnum(StatusEnum.Todo)}
              </MenuItem>
              <MenuItem value={StatusEnum.Progress}>
                {getNameByEnum(StatusEnum.Progress)}
              </MenuItem>
              <MenuItem value={StatusEnum.Completed}>
                {getNameByEnum(StatusEnum.Completed)}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              size="small"
              fullWidth
              labelId="priority-label"
              name="priority"
              id="priority"
              label="Priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              <MenuItem value={PriorityEnum.Low}>
                {getNameByEnum(PriorityEnum.Low)}
              </MenuItem>
              <MenuItem value={PriorityEnum.Normal}>
                {getNameByEnum(PriorityEnum.Normal)}
              </MenuItem>
              <MenuItem value={PriorityEnum.High}>
                {getNameByEnum(PriorityEnum.High)}
              </MenuItem>
              <MenuItem value={PriorityEnum.HighNext}>
                {getNameByEnum(PriorityEnum.HighNext)}
              </MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions classes={{ root: 'p-10' }}>
        <Button variant="outlined" onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={formik.submitForm} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTaskModal;
