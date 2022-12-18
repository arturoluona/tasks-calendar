import React from 'react';
import { BasicCardProps, PriorityEnum } from '@/models';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { getNameByEnum } from '@/utils';
import { Workspaces as WorkspacesIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateTask } from '@/redux/states/task';

/**
 * Component menu options priority.
 *
 * @param prop BasicCardProps interface.
 * @param prop.task Task to change priority.
 * @returns React element OptionsPriority.
 */
const OptionsPriority: React.FC<BasicCardProps> = ({
  task,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * Open menu priority.
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
   * Change priority of task from action store.
   *
   * @param priority Selected priority to change.
   */
  const changePriority = (priority: PriorityEnum): void => {
    dispatch(
      updateTask({
        ...task,
        priority,
      })
    );
    handleClose();
  };

  return (
    <>
      <Tooltip title={getNameByEnum(task.priority)}>
        <IconButton
          aria-label="priority"
          id="menu-priority-btn"
          aria-controls={open ? 'menu-priority' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={'text-' + task.priority}
          onClick={handleClick}
        >
          <WorkspacesIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-priority"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-priority',
        }}
      >
        <MenuItem onClick={() => changePriority(PriorityEnum.Low)}>
          {getNameByEnum(PriorityEnum.Low)}
        </MenuItem>
        <MenuItem onClick={() => changePriority(PriorityEnum.Normal)}>
          {getNameByEnum(PriorityEnum.Normal)}
        </MenuItem>
        <MenuItem onClick={() => changePriority(PriorityEnum.High)}>
          {getNameByEnum(PriorityEnum.High)}
        </MenuItem>
        <MenuItem onClick={() => changePriority(PriorityEnum.HighNext)}>
          {getNameByEnum(PriorityEnum.HighNext)}
        </MenuItem>
      </Menu>
    </>
  );
};

export default OptionsPriority;
