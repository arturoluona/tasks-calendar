import React from 'react';
import { BasicCardProps } from '@/models';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const OptionsTask: React.FC<BasicCardProps> = (): React.ReactElement => {
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

export default OptionsTask;
