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
  ExpandMore as ExpandMoreIcon,
  Workspaces as WorkspacesIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  MoreVert as MoreVertIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Task } from '@/models';
import { shortDate, getNameByEnum } from '@/utils';

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
        action={<MenuCard />}
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
            <Tooltip title={getNameByEnum(task.status)}>
              <IconButton aria-label="status" className={'text-' + task.status}>
                <RadioButtonCheckedIcon />
              </IconButton>
            </Tooltip>
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

const MenuCard: React.FC = (): React.ReactElement => {
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
      <IconButton
        aria-label="settings"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default TaskCard;
