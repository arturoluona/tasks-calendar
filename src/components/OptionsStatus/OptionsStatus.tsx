import React from 'react';
import { BasicCardProps, StatusEnum } from '@/models';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { getNameByEnum } from '@/utils';
import { RadioButtonChecked as RadioButtonCheckedIcon } from '@mui/icons-material';

const OptionsStatus: React.FC<BasicCardProps> = ({
  task,
}): React.ReactElement => {
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

export default OptionsStatus;
