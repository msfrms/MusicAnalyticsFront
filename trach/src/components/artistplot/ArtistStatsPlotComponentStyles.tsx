import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
    circle: {
      border: '1px solid #D2D2D2',
      boxSizing: 'border-box',
      borderRadius: 10,
      width: 20,
      height: 20,
    },
    legendText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      color: '#000000',
      paddingRight: 20,
      paddingLeft: 10,
    },
    disableLegendText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      color: '#969696',
      paddingRight: 20,
      paddingLeft: 10,
    },
    legend: {
      paddingLeft: 25,
      paddingBottom: 15,
    },
    root: {
      paddingTop: 30
    },
  }))
