import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'

function DashBoard (props) {
    useEffect(() => {
        console.log('DashBoard - useEffect props', props)
    }, [])

    return (
        <Container maxWidth="sm">
            <Avatar>H</Avatar>
        </Container>
    )
}

export default DashBoard
