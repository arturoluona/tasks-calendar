import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon,
} from '@mui/icons-material';
import { FormikHelpers, useFormik } from 'formik';
import { PriorityEnum, StatusEnum, Task } from '@/models';
import { getNameByEnum } from '@/utils';
import {
  StyleActions,
  StyleCard,
  StyleFields,
} from '@/components/AddTaskBtnModal/AddTaskBtnModal.style';

const AddTaskBtnModal: React.FC = (): React.ReactElement => {
  const [isModalAddCard, setModalAddCard] = React.useState(false);

  const saveTask = (values: Task, actions: FormikHelpers<Task>) => {
    console.log({ values, actions });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: new Date().toISOString(),
      status: StatusEnum.Draft,
      priority: PriorityEnum.Low,
    } as Task,
    onSubmit: saveTask,
  });

  /** Toggle hide or show modal. */
  const toggleModal = () => {
    formik.resetForm();
    setModalAddCard(!isModalAddCard);
  };

  return (
    <>
      <Tooltip title="Add new task">
        <IconButton
          aria-label="add task"
          className="text-white"
          onClick={toggleModal}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={isModalAddCard}
        onClose={toggleModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Card sx={StyleCard}>
          <div>
            <CardHeader
              sx={{ pb: 0 }}
              action={
                <IconButton aria-label="close-modal" onClick={toggleModal}>
                  <CloseOutlinedIcon />
                </IconButton>
              }
              title={<h3>Add new task</h3>}
            />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  sx={StyleFields}
                  fullWidth
                  autoComplete="off"
                  required
                  id="name"
                  label="Title"
                  size="small"
                  placeholder="Take the dog out"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <TextField
                  sx={StyleFields}
                  fullWidth
                  autoComplete="off"
                  multiline
                  required
                  rows={4}
                  id="description"
                  label="Description"
                  size="small"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                <TextField
                  sx={StyleFields}
                  fullWidth
                  required
                  type="date"
                  id="date"
                  label="Date"
                  size="small"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    sx={StyleFields}
                    fullWidth
                    required
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
                    sx={StyleFields}
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
            </CardContent>
          </div>
          <CardActions sx={StyleActions}>
            <Button variant="outlined" onClick={toggleModal}>
              Cancel
            </Button>
            <Button onClick={formik.submitForm} variant="contained">
              Save
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};

export default AddTaskBtnModal;
