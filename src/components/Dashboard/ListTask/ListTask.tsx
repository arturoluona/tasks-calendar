import React, { useState } from 'react';
import { Collapse } from '@mui/material';
import { ContentListTask } from '@/components';
import { ListTaskProps } from '@/models';
import { getNameByEnum } from '@/utils';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

const ListTask: React.FC<ListTaskProps> = ({
  tasks,
  status,
}): React.ReactElement => {
  const { setNodeRef } = useDroppable({ id: status });
  const [isExpanded, setExpanded] = useState(false);

  /** Toggle expand list tasks only for mobile. */
  const toggleListMobile = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="w-full sm:min-w-[240px] sm:w-1/4 h-full sm:h-[calc(100vh-100px)]">
      {/*Desktop header*/}
      <div
        className={
          'hidden sm:block rounded-t-lg text-center w-full p-2 bg-' + status
        }
      >
        {getNameByEnum(status)}
      </div>
      {/*Mobil header*/}
      <div
        onClick={toggleListMobile}
        className={
          (isExpanded ? 'rounded-t-lg ' : 'rounded-lg ') +
          'block sm:hidden text-left flex justify-between w-full p-2 cursor-pointer bg-' +
          status
        }
      >
        {getNameByEnum(status)}
        <div className="text-gray-500">
          {!isExpanded && <ExpandMoreIcon />}
          {isExpanded && <ExpandLessIcon />}
        </div>
      </div>
      {/*Mobile content*/}
      <Collapse
        in={isExpanded}
        className={
          'block sm:hidden mb-2 border border-gray-300 border-t-0 rounded-b-lg p-2'
        }
      >
        <ContentListTask tasks={tasks} />
      </Collapse>
      {/*Desktop content*/}
      <div className="hidden sm:block h-[calc(100%-45px)]">
        <SortableContext
          id={status}
          items={tasks}
          strategy={rectSortingStrategy}
        >
          <div
            ref={setNodeRef}
            className={
              'h-full border border-gray-300 border-t-0 rounded-b-lg p-2 overflow-auto scrollbar'
            }
          >
            <ContentListTask tasks={tasks} />
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default ListTask;
