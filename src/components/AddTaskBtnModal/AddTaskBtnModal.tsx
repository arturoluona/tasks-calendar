import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Tooltip,
} from '@mui/material';
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  Workspaces as WorkspacesIcon,
  CloseOutlined as CloseOutlinedIcon,
} from '@mui/icons-material';
import { SxProps } from '@mui/system';

const AddTaskBtnModal: React.FC = (): React.ReactElement => {
  const [isModalAddCard, setModalAddCard] = React.useState(false);

  const styleCard: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '40%',
    maxWidth: '95%',
    maxHeight: '95%',
    minHeight: '60%',
    bgcolor: 'background.paper',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 1,
  };

  const styleActions: SxProps = {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
  };

  /** Toggle hide or show modal. */
  const toggleModal = () => {
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
        <Card sx={styleCard}>
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
            <CardContent>This its content</CardContent>
          </div>
          <CardActions sx={styleActions}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Save</Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};

export default AddTaskBtnModal;
