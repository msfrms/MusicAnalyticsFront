import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
      leftText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 1.3,
        fontSize: 16,        
        color: '#FFFFFF',
        padding: 6,        
      },        
      rightText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 1.3,
        fontSize: 16,     
        color: '#969696',
        padding: 6,        
      },
}))
  
export const InfoTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgb(0, 0, 0, 0.81)',
    borderRadius: 12,            
  },
}))(Tooltip)
