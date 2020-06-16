import React from 'react'
import getConfig from 'next/config'
import mockData from '../mock/config'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

const { publicRuntimeConfig } = getConfig()
const { API_URL, USE_MOCK } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    }
})

function Index () {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
            <CircularProgress />
        </Container>
    )
}

export async function getStaticProps () {
    try {
        let data
        if (USE_MOCK) {
            data = mockData
        } else {
            try {
                const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/NIFFF')
                data = await response.json()
            } catch (err) {
                data = { message: 'no-data' }
            }
        }

        return {
            props: {
                eventData: data
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export default Index
