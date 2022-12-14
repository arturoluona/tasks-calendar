import React, { useState } from 'react';
import { BasicCardProps } from '@/models';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeTask } from '@/redux/states/task';
import { AddEditTaskModal } from '@/components';

/**
 * Component menu options task.
 *
 * @param prop BasicCardProps interface.
 * @param prop.task Task to edit or delete.
 * @returns React element OptionsTask.
 */
const OptionsTask: React.FC<BasicCardProps> = ({
  task,
}): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenDialog, handleDialog] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  /**
   * Open menu options task.
   *
   * @param event Element to open.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  /** Close menu. */
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  /** Delete task from action store. */
  const deleteTask = (): void => {
    dispatch(removeTask(task.id));
    handleClose();
  };

  return (
    <>
      <Tooltip title="Options">
        <IconButton
          aria-label="settings"
          id="menu-settings-btn"
          aria-controls={open ? 'menu-settings' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-settings"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-settings',
        }}
      >
        <MenuItem onClick={() => handleDialog(true)}>Edit</MenuItem>
        <MenuItem onClick={deleteTask}>Delete</MenuItem>
      </Menu>
      <AddEditTaskModal
        isOpen={isOpenDialog}
        handleClose={() => handleDialog(false)}
        task={task}
      />
    </>
  );
};

export default OptionsTask;
