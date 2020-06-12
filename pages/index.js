import React, { useEffect, useState } from 'react'
import getConfig from 'next/config'
import Button from '@material-ui/core/Button'
import EventLayout from '../components/eventLayout'
import mockData from '../mock/config'
import Link from '@material-ui/core/Link'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'

const loadingElement = <div><p style={{ textAlign: 'center' }}> Loading process ! </p></div>
const debugElement = <div><p style={{ textAlign: 'center' }}> Debug process ! </p>
    <Link href="/startPage">
        <Button variant="contained">StartPage</Button>
    </Link></div>

function Index (props) {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log('App - useEffect props', props)
        setLoading(false)
    }, [])

    return (
        <EventLayout>
            { isLoading
                ? loadingElement
                : debugElement
            }
        </EventLayout>
    )
}

Index.getInitialProps = async (ctx) => {
    const data = mockData
    return {
        props: {
            data
        }
    }
}

export default Index
