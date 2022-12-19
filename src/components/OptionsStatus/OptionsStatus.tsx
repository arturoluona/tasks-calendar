import React from 'react';
import { BasicCardProps, StatusEnum } from '@/models';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { getNameByEnum } from '@/utils';
import { RadioButtonChecked as RadioButtonCheckedIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateTask } from '@/redux/states/task';

/**
 * Component menu options status.
 *
 * @param prop BasicCardProps interface.
 * @param prop.task Task to change status.
 * @returns React element OptionsStatus.
 */
const OptionsStatus: React.FC<BasicCardProps> = ({
  task,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * Open menu status.
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

  /**
   * Change status of task from action store.
   *
   * @param status Selected status to change.
   */
  const changeStatus = (status: StatusEnum): void => {
    dispatch(
      updateTask({
        ...task,
        status,
      })
    );
    handleClose();
  };

  return (
    <>
      <Tooltip title={getNameByEnum(task.status)}>
        <IconButton
          aria-label="status"
          id="menu-status-btn"
          aria-controls={open ? 'menu-status' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={'text-' + task.status}
          onClick={handleClick}
        >
          <RadioButtonCheckedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-status"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-status',
        }}
      >
        <MenuItem onClick={() => changeStatus(StatusEnum.Draft)}>
          {getNameByEnum(StatusEnum.Draft)}
        </MenuItem>
        <MenuItem onClick={() => changeStatus(StatusEnum.Todo)}>
          {getNameByEnum(StatusEnum.Todo)}
        </MenuItem>
        <MenuItem onClick={() => changeStatus(StatusEnum.Progress)}>
          {getNameByEnum(StatusEnum.Progress)}
        </MenuItem>
        <MenuItem onClick={() => changeStatus(StatusEnum.Completed)}>
          {getNameByEnum(StatusEnum.Completed)}
        </MenuItem>
      </Menu>
    </>
  );
};

export default OptionsStatus;
