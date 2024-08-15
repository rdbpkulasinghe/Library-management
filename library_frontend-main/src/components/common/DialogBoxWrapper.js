import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, DialogActions } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)',
  },
}));

export default function DialogBoxWrapper({ children, title, mainComponent, dismissable, extraButtons, cleanup }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    cleanup && cleanup();
  };

  return (
    <React.Fragment>
      <Box sx={{ height: '100%' }} onClick={handleClickOpen}>
        {children}
      </Box>
      <BootstrapDialog aria-labelledby='customized-dialog-title' open={open} onClose={dismissable ? handleClose : null}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          {title}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{mainComponent}</DialogContent>
        {extraButtons && (
          <DialogActions>
            {extraButtons.map((val, key) => {
              return (
                <Button key={key} onClick={val.handler}>
                  {val.title}
                </Button>
              );
            })}
          </DialogActions>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
