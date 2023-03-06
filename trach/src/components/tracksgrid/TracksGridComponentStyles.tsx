import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      marginTop: 70,
    },
    gridContainer: {
      marginTop: 30,
    },
    gridItem: {
      marginBottom: 30,
      marginRight: 80,
    },
    header: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'left',
      color: '#000000',
    },
    title: {
      '&:hover': {
        textDecorationLine: 'underline',
      },
      cursor: 'pointer',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 16,
      textAlign: 'left',
      color: '#000000',
    },
    subtitle: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 16,
      textAlign: 'left',
      marginTop: 2,
      color: '#9F9F9F',
    },
    cover: {
      width: 65,
      height: 65,
      borderRadius: 3,
      marginRight: 20,
    },
  }))
