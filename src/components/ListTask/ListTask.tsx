import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Collapse } from '@mui/material';
import { TaskCard } from '@/components';
import { StatusEnum, Task } from '@/models';
import { getNameByEnum } from '@/utils';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

/** Interface props. */
interface ListTaskProps {
  /** List tasks to render. */
  tasks: Task[];
  /** Status of list tasks. */
  status: StatusEnum;
}

const ListTask: React.FC<ListTaskProps> = ({
  tasks,
  status,
}): React.ReactElement => {
  const [isExpanded, setExpanded] = useState(false);

  /** Toggle expand list tasks only for mobile. */
  const toggleListMobile = () => {
    isMobile && setExpanded(!isExpanded);
  };

  return (
    <div className="w-full sm:min-w-[240px] sm:w-1/4 h-full sm:h-[calc(100vh-100px)]">
      <div
        onClick={toggleListMobile}
        className={
          (isMobile
            ? (isExpanded ? 'rounded-t-lg ' : 'rounded-lg ') +
              'text-left flex justify-between '
            : 'rounded-t-lg text-center ') +
          'w-full p-2 bg-' +
          status
        }
      >
        {getNameByEnum(status)}
        {isMobile && (
          <>
            {!isExpanded && <ExpandMoreIcon />}
            {isExpanded && <ExpandLessIcon />}
          </>
        )}
      </div>
      <Collapse
        in={(isMobile && isExpanded) || !isMobile}
        className={
          (isMobile ? 'mb-2 ' : 'h-[calc(100%-45px)] ') +
          'border border-gray-300 border-t-0 rounded-b-lg p-2 overflow-auto scrollbar'
        }
      >
        {tasks &&
          tasks.length &&
          tasks.map((task) => (
            <div className="my-2" key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        {((tasks && !tasks.length) || !tasks) && (
          <p className="text-center text-sm">There are no tasks to list.</p>
        )}
      </Collapse>
    </div>
  );
};

export default ListTask;
