import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    adminToolbar: {
        position: 'absolute',
        zIndex: 9999999999,
        top: 5,
        left: 5,
        backgroundColor: 'red',
        opacity: 0.8,
        padding: '2px 5px',
        boxShadow: '0px 0px 7px 2px #000000'
    },
    appBar: {
        alignItems: 'center',
        position: 'static',
        textAlign: 'center'

    },
    dateChanger: {
        marginBottom: '5px'
    },
    drawerPaper: {
        backgroundColor: '#424242',
        color: '#FFFFFF'
    },
    dateField: {
        color: '#FFFFFF!important'
    },
    adminIcon: {
        color: '#FFFFFF'
    }
}))
