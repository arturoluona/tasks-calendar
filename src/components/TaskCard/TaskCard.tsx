import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import React from 'react';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  Workspaces as WorkspacesIcon,
} from '@mui/icons-material';
import { StatusEnum, Task } from '@/models';
import { getNameByEnum, shortDate } from '@/utils';

/** Interface props. */
interface TaskCardProps {
  /** Task card. */
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }): React.ReactElement => {
  const [isShowMore, setShowMore] = React.useState<boolean>(false);

  /** Show or hide description. */
  const toggleExpandClick = () => {
    setShowMore(!isShowMore);
  };

  /**
   * Parse name of task to get initials.
   *
   * @returns String with name of enum.
   */
  function getInitialsAvatar(): string {
    const name = task.name.split(' ');
    return (name[0][0] + (name[1] ? name[1][0] : '')).toUpperCase();
  }

  return (
    <Card className="border">
      <CardHeader
        avatar={
          <Avatar className={'mr-[-5px] bg-' + task.status} aria-label="recipe">
            {getInitialsAvatar()}
          </Avatar>
        }
        action={<MenuCard task={task} />}
        className="pb-0 truncate"
        title={task.name}
        subheader={
          <span className="text-xs w-[20px] truncate">
            {shortDate(task.date)}
          </span>
        }
      />
      <CardContent className="pb-0">
        <Collapse
          in={isShowMore}
          collapsedSize={40}
          className="text-sm text-gray-600"
        >
          {task.description}
        </Collapse>
      </CardContent>
      <CardActions disableSpacing>
        <div className="flex justify-between items-center w-full">
          <div>
            <MenuStatus task={task} />
            <Tooltip title={getNameByEnum(task.priority)}>
              <IconButton
                aria-label="priority"
                className={'ml-2 text-' + task.priority}
              >
                <WorkspacesIcon />
              </IconButton>
            </Tooltip>
          </div>
          {task.description.length > 55 && (
            <Tooltip
              title={isShowMore ? 'less description' : 'see description'}
            >
              <IconButton onClick={toggleExpandClick}>
                {!isShowMore && <ExpandMoreIcon />}
                {isShowMore && <ExpandLessIcon />}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MenuStatus: React.FC<TaskCardProps> = ({ task }): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>
          {getNameByEnum(StatusEnum.Draft)}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {getNameByEnum(StatusEnum.Todo)}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {getNameByEnum(StatusEnum.Progress)}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {getNameByEnum(StatusEnum.Completed)}
        </MenuItem>
      </Menu>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MenuCard: React.FC<TaskCardProps> = ({ task }): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default TaskCard;
