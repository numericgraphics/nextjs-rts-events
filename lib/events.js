import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export async function getAllEvents () {
    try {
        // DEBUG -  statement
        // const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/demo/getEvents`
        // const response = await fetch(url)
        const content = [
            { shortName: 'QQ' },
            { shortName: 'WF' },
            { shortName: 'WF2' },
            { shortName: 'WF3' },
            { shortName: 'WF4' },
            { shortName: 'WF5' },
            { shortName: 'WF6' },
            { shortName: 'TEST' },
            { shortName: 'Culture2020' },
            { shortName: 'popquiz' },
            { shortName: 'popquiz2' }
        ]

        // if (response.status !== 200) {
        //     console.log('FETCH ERROR - getEvents', response.status)
        //     content = [
        //         { shortName: 'QQ' },
        //         { shortName: 'WF' },
        //         { shortName: 'WF2' },
        //         { shortName: 'WF3' },
        //         { shortName: 'TEST' }
        //     ]
        // } else {
        //     content = await response.json()
        // }

        return content.map(event => {
            return {
                params: {
                    events: event.shortName.toString()
                }
            }
        })
    } catch (error) {
        console.log('getAllEvents - ERROR', error)
        throw error
    }
}

export async function getAllGifts () {
    try {
        const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/demo/getEvents`
        const response = await fetch(url)
        const content = await response.json()

        return content.map(event => {
            return {
                params: {
                    events: event.shortName.toString()
                }
            }
        })
    } catch (error) {
        console.log('getAllEvents - ERROR', error)
        throw error
    }
}

export async function getEventsData (events) {
    try {
        const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${events}`
        const response = await fetch(url)
        const content = await response.json()

        if (response.status !== 200) {
            throw new Error(`There is a problem with ${events} event`)
        }

        return {
            events,
            content
        }
    } catch (error) {
        console.log('getEventsData - ERROR', error)
        throw error
    }
}
