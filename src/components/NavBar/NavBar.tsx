import {
  AppBar,
  Button,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  SearchRounded as SearchRoundedIcon,
} from '@mui/icons-material';
import { AddEditTaskModal } from '@/components';
import { searchTask } from '@/utils';

/**
 * Component NavBar.
 *
 * @returns React element NavBar.
 */
const NavBar = () => {
  const [isOpenDialog, handleDialog] = useState(false);

  /**
   * Emit search.
   *
   * @param event Input event.
   */
  const searchTasks = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    searchTask(event.currentTarget.value || '');
  };

  return (
    <>
      <AppBar position="static" className={'bg-blue-500'}>
        <div className="flex justify-between items-center flex-wrap p-2">
          <div className="flex items-center gap-3">
            <Button
              variant="text"
              className="text-white font-semibold normal-case text-base flex items-center"
            >
              <Link to="/">Home</Link>
            </Button>
            {/*<Button*/}
            {/*  variant="text"*/}
            {/*  className="text-white font-semibold normal-case text-base flex items-center"*/}
            {/*>*/}
            {/*  <Link to="/calendar">Calendar</Link>*/}
            {/*</Button>*/}
          </div>

          <div className="flex items-center gap-3">
            <FormControl className="bg-blue-400 hover:bg-blue-300 rounded border-none w-full sm:w-auto">
              <Input
                className={
                  'text-gray-50 border-none after:border-none before:border-none'
                }
                placeholder="Search.."
                onChange={searchTasks}
                startAdornment={
                  <InputAdornment position="start" className={'pl-2'}>
                    <SearchRoundedIcon className={'text-white'} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Tooltip title="Add new task">
              <IconButton
                aria-label="add task"
                className="text-white"
                onClick={() => handleDialog(true)}
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <AddEditTaskModal
              handleClose={() => handleDialog(false)}
              isOpen={isOpenDialog}
            />
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default NavBar;
