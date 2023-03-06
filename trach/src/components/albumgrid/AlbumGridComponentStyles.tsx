import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((_: Theme) =>
    createStyles({
        root: {
            marginTop: 70,
        },
        gridContainer: {
            marginTop: 30,
        },
        header: {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'left',
            color: '#000000',
        },
    }))