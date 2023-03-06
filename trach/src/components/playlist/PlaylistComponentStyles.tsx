import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
      text: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        marginLeft: 20,
      },
      grayText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'left',
        color: '#969696',
        marginLeft: 20,
      },
      boldText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',        
        marginLeft: 20,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      cover: {
          width: 130,
          height: 130,
          borderRadius: 6,
      },
      item: {
        marginRight: 40,
        marginBottom: 20,
      },
      root: {
        marginTop: 30,
      }
}))
 