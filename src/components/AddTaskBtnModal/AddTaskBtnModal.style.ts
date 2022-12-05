import { SxProps } from '@mui/system';

/** Styles to box modal. */
const StyleCard: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '40%',
  maxWidth: '95%',
  maxHeight: '95%',
  minHeight: '60%',
  bgcolor: 'background.paper',
  borderRadius: 4,
  p: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

/** Style to button actions modal. */
const StyleActions: SxProps = {
  width: '100%',
  display: 'flex',
  justifyContent: 'end',
};

/** Style to input fields. */
const StyleFields: SxProps = {
  mb: 3,
};

export { StyleCard, StyleActions, StyleFields };
