import {
  AppBar,
  Button,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  Tooltip,
  Modal,
  Box,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  SearchRounded as SearchRoundedIcon,
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
} from '@mui/icons-material';

const NavBar = () => {
  const [isModalAddCard, setModalAddCard] = React.useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  /** Toggle hide or show modal. */
  const toggleModal = () => {
    setModalAddCard(!isModalAddCard);
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
            <Button
              variant="text"
              className="text-white font-semibold normal-case text-base flex items-center"
            >
              <Link to="/calendar">Calendar</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
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
            <Tooltip title="Add new task">
              <IconButton
                aria-label="add task"
                className="text-white"
                onClick={toggleModal}
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </AppBar>
      <Modal
        open={isModalAddCard}
        onClose={toggleModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </Box>
      </Modal>
    </>
  );
};

export default NavBar;
