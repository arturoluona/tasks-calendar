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
  ZoomOutMap as ZoomOutMapIcon,
} from '@mui/icons-material';
import { BasicCardProps } from '@/models';
import { shortDate } from '@/utils';
import { OptionsTask, OptionsStatus, OptionsPriority } from '@/components';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

const TaskCard: React.FC<BasicCardProps> = ({ task }): React.ReactElement => {
  const [isShowMore, setShowMore] = React.useState<boolean>(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: 10,
  };

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
    <Card className="border" style={style} ref={setNodeRef} {...attributes}>
      <CardHeader
        avatar={
          <Avatar className={'mr-[-5px] bg-' + task.status} aria-label="recipe">
            {getInitialsAvatar()}
          </Avatar>
        }
        action={<OptionsTask task={task} />}
        className="pb-0 truncate"
        title={
          <Tooltip title={task.name} placement="top">
            <p className="truncate">{task.name}</p>
          </Tooltip>
        }
        subheader={
          <Tooltip title={shortDate(task.date as string)}>
            <p className="text-xs truncate">{shortDate(task.date as string)}</p>
          </Tooltip>
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
            <OptionsPriority task={task} />
          </div>
          <div className="flex ">
            <div className="hidden sm:block">
              <Tooltip title="Move task">
                <IconButton {...listeners}>
                  <ZoomOutMapIcon />
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
        </div>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
