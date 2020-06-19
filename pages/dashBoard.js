import React, { useContext, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
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
    const classes = useStyles()
    const { dataProvider } = useContext(UserContext)

    useEffect(() => {
        console.log('DashBoard - useEffect getAllData', dataProvider.getAllData())
        console.log('DashBoard - useEffect  dataProvider', dataProvider)
        console.log('DashBoard - useEffect getGift', dataProvider.getGifts())
        console.log('DashBoard - useEffect  getPromos', dataProvider.getPromos())
    }, [])

    return (
        <Container maxWidth="sm">
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Avatar>H</Avatar>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        DashBoard
                    </Typography>
                </CardContent>
            </Card>

        </Container>
    )
}

export default DashBoard
