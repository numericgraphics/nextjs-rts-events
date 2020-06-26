import React, { useContext, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import Progress from '../components/progress'
import EventLayout from '../components/eventLayout'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    slideGlobal: {
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        minWidth: 275,
        minHeight: 300,
        margin: 20
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 275,
        minHeight: 300

    }
})

function DashBoard (props) {
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const classes = useStyles()
    const { dataProvider } = useContext(UserContext)

    async function fetchData () {
        try {
            const response = await fetch('/api/fetchGame')

            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
                initDashPage()
            } else {
                await Router.push({
                    pathname: '/',
                    query: { modal: true }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    function initDashPage () {
        // setTranslation(dataProvider.getTranslation())
        setUser(dataProvider.getUser())
        setLoading(false)
    }

    useEffect(() => {
        fetchData().then()
    }, [])

    return (
        <EventLayout>
            {isLoading
                ? <Progress/>
                : <Box className={classes.slideGlobal}>
                    <Container maxWidth="sm">
                        <Card className={classes.root}>
                            <CardContent className={classes.content}>
                                <Avatar src={user.avatarURL}/>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {user.nickname}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Container>
                </Box>
            }
        </EventLayout>
    )
}

export default DashBoard
