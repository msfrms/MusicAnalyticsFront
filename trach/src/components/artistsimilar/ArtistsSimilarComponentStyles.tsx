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
    gridItemSelected: {
      marginBottom: 30,
      marginRight: 80,
      background: 'linear-gradient(to left, #F4F4F4 73.44%, rgba(248, 248, 248, 0) 100%)',
      borderRadius: 8,
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
        color: '#000000',
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
      width: 105,
      height: 105,
      borderRadius: 3,
      marginRight: 20,
    },
  }))
