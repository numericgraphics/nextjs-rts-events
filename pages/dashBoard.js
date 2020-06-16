import React, { useContext, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../components/UserContext'

function DashBoard (props) {
    const { dataProvider } = useContext(UserContext)
    useEffect(() => {
        console.log('DashBoard - useEffect getAllData', dataProvider.getAllData())
        console.log('DashBoard - useEffect  dataProvider', dataProvider)
        console.log('DashBoard - useEffect getGift', dataProvider.getGift())
        console.log('DashBoard - useEffect  getPromos', dataProvider.getPromos())
    }, [])

    return (
        <Container maxWidth="sm">
            <Avatar>H</Avatar>
        </Container>
    )
}

export default DashBoard
