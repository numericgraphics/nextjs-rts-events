import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        minHeight: '70vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: '3vw'
    },
    containerTitle: {
        position: 'relative',
        paddingBottom: 30
    },
    title: {
        letterSpacing: '0em'
    },
    button: {
        width: '60%!important',
        marginBottom: '0rem!important'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& .a': {
            color: 'black'
        }
    },
    smsInput: {
        marginBottom: '3vw!important'
    },
    dropDown: {
        textAlign: 'left',
        maxWidth: '50vw',
        color: 'black'
    },
    dropDownDisabled: {
        textAlign: 'left',
        maxWidth: '50vw',
        color: 'grey',
        backgroundColor: 'grey'
    },
    CGUContent: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        textAlign: 'left'
    },
    CGUBox: {
        color: theme.palette.formNoValidate
    },
    CGUBoxCheck: {
        color: `${theme.palette.formValidate}!important`
    },
    CGU: {
        width: '100%',
        marginBottom: '1.5vw!important'
    },
    CGUText: {
        // fontSize: '0.9rem!important',
        letterSpacing: '0.00238em',
        lineHeight: '1.2em',
        color: theme.palette.primary.contrastText,
        '& a': {
            color: theme.palette.primary.contrastText
        }
    },
    link: {
        color: 'red',
        lineHeight: '1.1rem',
        textDecoration: 'underline'
    },
    container: {
        width: '80%',
        minWidth: 173
    },
    iconClass: {
        height: 'unset'
    },
    iconClassChecked: {
        height: 'unset',
        stroke: '#00FF14'
    },
    shakeMe: {
        WebkitAnimationName: 'shake',
        WebkitAnimationDuration: '0.82s',
        WebkitAnimationTimingFunction: 'cubic-bezier(.36,.07,.19,.97)',
        WebkitAnimationFillMode: 'both',
        transform: 'translate3d(0, 0, 0)',
        WebkitAnimationDelay: '1s'
    },
    phoneInputBorder: {
        boxShadow: '0 0 0 0.2rem rgba(0, 255, 20, 0.9)'
    },
    gridList: {
        width: '100%',
        height: '50vh',
        margin: 0,
        marginBottom: '3vw!important',
        '& .MuiGridListTile-root': {
            opacity: 0.7,
            border: 'solid 5px rgba(0, 0, 0, 0)'
        },
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    selected: {
        border: `solid 5px ${theme.palette.secondary.main}!important`,
        borderRadius: '8px',
        // outlineOffset: '-4px',
        // filter: 'drop-shadow(0px 0px 3px #333)!important',
        WebkitAnimationName: 'avatarSelected',
        WebkitAnimationDuration: '0.8s',
        WebkitAnimationTimingFunction: 'ease-in',
        WebkitAnimationFillMode: 'forwards'
    }
}))
export const styles = {
    textField: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.125rem',
        color: '#020202',
        border: 'none',
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
        margin: '0.2rem',
        WebkitAppearance: 'none'
    }
}
