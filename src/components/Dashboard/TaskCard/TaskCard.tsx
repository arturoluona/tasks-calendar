import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import React from 'react';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Workspaces as WorkspacesIcon,
} from '@mui/icons-material';
import { BasicCardProps } from '@/models';
import { getNameByEnum, shortDate } from '@/utils';
import { OptionsTask, OptionsStatus } from '@/components';

const TaskCard: React.FC<BasicCardProps> = ({ task }): React.ReactElement => {
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
        action={<OptionsTask task={task} />}
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
            <OptionsStatus task={task} />
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

export default TaskCard;
