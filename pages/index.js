import React, { useEffect, useState } from 'react'
import getConfig from 'next/config'
import Button from '@material-ui/core/Button'
import EventLayout from '../components/eventLayout'
import mockData from '../mock/config'
import Router from 'next/router'

const { publicRuntimeConfig } = getConfig()
const { API_URL, USE_MOCK } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'

const LoadingElement = <div><p style={{ textAlign: 'center' }}> Loading process ! </p></div>

function goToStarPage () {
    Router.push('/startPage')
}

const DebugElement = <div><p style={{ textAlign: 'center' }}> Debug process ! </p>
    <Button variant="contained" onClick={goToStarPage}>StartPage</Button>
</div>

function Index (props) {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log('App - useEffect props', props)
        setLoading(false)
    }, [])

    return (
        <EventLayout>
            { isLoading
                ? LoadingElement
                : DebugElement
            }
        </EventLayout>
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
