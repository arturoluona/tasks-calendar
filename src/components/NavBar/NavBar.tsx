import {
  AppBar,
  Button,
  FormControl,
  InputAdornment,
  Input,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const NavBar = () => {
  return (
    <AppBar position="static" className={'bg-blue-500'}>
      <div className="flex justify-between items-center flex-wrap p-2">
        <div className="flex items-center gap-3">
          <Button
            variant="text"
            className="text-white font-semibold normal-case text-base flex items-center"
          >
            <Link to="/">Home</Link>
          </Button>
          <Button
            variant="text"
            className="text-white font-semibold normal-case text-base flex items-center"
          >
            <Link to="/calendar">Calendar</Link>
          </Button>
        </div>

        <FormControl className="bg-blue-400 hover:bg-blue-300 rounded border-none w-full sm:w-auto">
          <Input
            className={
              'text-gray-50 border-none after:border-none before:border-none'
            }
            placeholder="Search.."
            startAdornment={
              <InputAdornment position="start" className={'pl-2'}>
                <SearchRoundedIcon className={'text-white'} />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </AppBar>
  );
};

export default NavBar;
