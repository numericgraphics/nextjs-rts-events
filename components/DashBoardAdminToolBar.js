import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { hourConverter, dateObjConvert } from '../data/tools'
import ExtensionIcon from '@material-ui/icons/Extension'
import SettingsIcon from '@material-ui/icons/Settings'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import RestoreIcon from '@material-ui/icons/Restore'
import { ThemeProvider } from '@material-ui/styles'
import Router, { useRouter } from 'next/router'
import ThemeFactory from '../data/themeFactory'
import Typography from '@material-ui/core/Typography'
import { useStyles } from '../styles/DashBoardAdminToolBar.style'

function DashBoardAdminToolBar (props) {
    const classes = useStyles()
    const router = useRouter()
    const { events } = router.query
    const [hidded, setHidded] = useState(true)
    const [selectedDate, setSelectedDate] = useState({})

    async function setFakeTs (selectedDate) {
        if (selectedDate.time === null) {
            await Router.push(`/${events}/dashBoard?date=${selectedDate.date}`)
        } else {
            await Router.push(`/${events}/dashBoard?date=${selectedDate.date}&time=${selectedDate.time}`)
        }
    }

    async function resetTime () {
        await Router.push(`/${events}/dashBoard`)
    }

    const renderInput = (props) => (
        <TextField
            type="text"
            onClick={props.onClick}
            value={props.value}
            onChange={props.onChange}
            inputProps={{
                className: classes.dateField
            }}
        />
    )

    function toogleHide () {
        setHidded(!hidded)
    }

    async function resetGame () {
        try {
            alert('Will try to reset Game')
            const bodyContent = { eventName: events }
            const response = await fetch('/api/resetGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                props.timeStampMode.enable ? setFakeTs({ date: props.timeStampMode.date, time: props.timeStampMode.time }) : resetTime()
                alert('Game reseted')
            } else {
                alert('Could not reset game')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        if (selectedDate.date) {
            setFakeTs(selectedDate)
        }
    }, [selectedDate])

    return (
        <ThemeProvider theme={ThemeFactory.getAdminTheme}>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                open={!hidded}
                onClose={toogleHide}
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button key={'Reset game'} onClick={resetGame}>
                        <ListItemIcon><ExtensionIcon className={ classes.adminIcon } /></ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: 'subtitle2' }} primary={'Reset game'} />
                    </ListItem>
                    <ListItem button key={'Reset time'} onClick={resetTime}>
                        <ListItemIcon><RestoreIcon className={ classes.adminIcon } /></ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: 'subtitle2' }} primary={'Reset time'} />
                    </ListItem>
                    <ListItem>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                className={classes.dateField}
                                ampm={false}
                                TextFieldComponent={renderInput}
                                format="dd/MM/yyyy"
                                views={['year', 'month', 'date']}
                                value={new Date()}
                                onChange={(date) => setSelectedDate(dateObjConvert(date)) }
                            />
                        </MuiPickersUtilsProvider>
                    </ListItem>
                    { props.timeStampMode.date && <ListItem>
                        <Typography variant="subtitle2">Date simulé : {props.timeStampMode.date} </Typography>
                    </ListItem>}
                    { props.timeStampMode.time && <ListItem>
                        <Typography variant="subtitle2">Heure simulé : {hourConverter(props.timeStampMode.time)} </Typography>
                    </ListItem>}
                </List>
            </Drawer>
            <IconButton size="medium" onClick={toogleHide} color="secondary" style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
                <SettingsIcon/>
            </IconButton>
        </ThemeProvider>
    )
}

export default DashBoardAdminToolBar
