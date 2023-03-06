import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';

export type ConfirmReportProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  track: string
}

export default function ConfirmReportComponent(props: ConfirmReportProps) {
  return (
    <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Отчет</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="div">
              <Box fontSize="fontSize" m={1}>
                Вы действительно хотите создать отчет по треку:
              </Box>
              <Box fontSize="h6.fontSize" m={1}>{props.track}</Box>              
            </Typography>
          </DialogContentText>          
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Отмена
          </Button>
          <Button onClick={props.onConfirm} color="primary">
            Создать отчет
          </Button>
        </DialogActions>
      </Dialog>
  );
}