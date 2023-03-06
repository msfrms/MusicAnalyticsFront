import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, TextField, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

export type ReportProps = {
  isOpen: boolean
  track: string
  isError: boolean
  onClose: () => void
  onAuth?: () => void
  onLogin: (text: string) => void
  onPassword: (text: string) => void
}

export default function ReportComponent(props: ReportProps) {
  return (
    <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Отчет</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography component="div">
            <Box fontSize="fontSize" m={1}>Чтобы скачать отчет по треку:</Box>
            <Box fontSize="h6.fontSize" m={1}>{props.track}</Box>
            <Box fontSize="fontSize" m={1}>Вам нужно авторизоваться</Box>
          </Typography>
          <Grid direction='column'>
            <Grid item>
              <TextField
                label="Email"
                type={'email'}
                fullWidth
                style={{ paddingBottom: 10 }}
                onChange={(event) => props.onLogin(event.target.value)} />
            </Grid>
            <Grid item>
              <TextField
                error={props.isError}
                fullWidth
                label={props.isError ? "Неправильный логин или пароль" : "Password"}
                type={'password'}
                onChange={(event) => props.onPassword(event.target.value)} />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onAuth} disabled={props.onAuth === undefined} color="primary">
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
}