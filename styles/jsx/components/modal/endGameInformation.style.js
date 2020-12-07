import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 'min(3vw, 30px)',
        '& .MuiIconButton-root': {
            padding: '0!important'
        }
    },
    buttonClose: {
        alignSelf: 'flex-end!important'
    },
    subTitle: {
        marginBottom: 'min(1rem, 30px)'
    }
}))
