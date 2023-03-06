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
      },      
      notchedOutline: {      
        borderColor: 'transparent !important',
        background: 'transparent'        
      },
      root: {
        border: '1px solid #D2D2D2',
        boxSizing: 'border-box',
        borderRadius: 10,
        width: 336,
        paddingLeft: 10                
      },      
})) 