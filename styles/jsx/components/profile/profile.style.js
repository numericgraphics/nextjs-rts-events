import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 'min(3vw, 30px)',
        '& .MuiIconButton-root': {
            padding: '0!important'
        },
        '& .MuiInputBase-input': {
            padding: '0.4rem',
            '@media only screen and (max-height:550px)': {
                padding: '1.3rem'
            }
        }
    },
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& .a': {
            color: 'black'
        }
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        margin: 0,
        marginBottom: '4vw!important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    gridList: {
        width: '100%',
        margin: 0,
        marginBottom: 'min(1rem, 30px)!important',
        '& .MuiGridListTile-root': {
            opacity: 0.7,
            border: 'solid 5px rgba(0, 0, 0, 0)'
        },
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        '& .MuiAvatar-root': {
            width: 'auto',
            height: 'auto',
            backgroundColor: theme.palette.secondary.main
        }

    },
    selected: {
        border: `solid min(1.5vw, 5px) ${theme.palette.secondary.main}!important`,
        borderRadius: '50%',
        WebkitAnimationName: 'avatarSelected',
        WebkitAnimationDuration: '0.8s',
        WebkitAnimationTimingFunction: 'ease-in',
        WebkitAnimationFillMode: 'forwards'
    },
    textField: {
        border: 'none',
        width: '90%',
        height: 'auto',
        backgroundColor: 'white',
        padding: '0.4rem!important',
        margin: '0.2rem',
        WebkitAppearance: 'none',
        borderRadius: '5px',
        marginBottom: 'min(1rem, 30px)!important',
        '& input': {
            fontFamily: 'srgssr-type-Bd',
            textAlign: 'center!important',
            fontSize: '1.5rem',
            color: '#020202'
        }
    },
    circularProgress: {
        color: theme.palette.primary.contrastText
    },
    buttonClose: {
        alignSelf: 'flex-end!important'
    },
    buttonValidate: {
        minHeight: '55px',
        '@media only screen and (max-height:550px)': {
            minHeight: '43px'
        }
    },
    bottomZone: {
        width: '100%'
    }
}))
