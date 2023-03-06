import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((_: Theme) =>
    createStyles({
        title: {
            '&:hover': {
                textDecorationLine: 'underline',
            },
            cursor: 'pointer',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 16,
            textAlign: 'left',
            color: '#000000',
            marginTop: 5,
        },
        year: {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 16,
            textAlign: 'left',
            marginBottom: 3,
            color: '#9F9F9F',
        },
        subtitle: {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 16,
            textAlign: 'left',
            color: '#9F9F9F',
            marginBottom: 5
        },
        image: {
            borderRadius: 6,
            width: 120,
            height: 120,
            marginRight: 20,
        },
    }))