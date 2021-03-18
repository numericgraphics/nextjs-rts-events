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
            { shortName: 'WF7' },
            { shortName: 'H2021' },
            { shortName: 'TEST' },
            { shortName: 'Culture2020' },
            { shortName: 'popquiz' },
            { shortName: 'POP2' },
            { shortName: 'popquiz2' },
            { shortName: 'visites-tour-rts-parcours-a' },
            { shortName: 'visites-tour-rts-parcours-b' },
            { shortName: 'visites-sallaz-parcours-a' },
            { shortName: 'visites-sallaz-parcours-b' }
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

export async function getEventsData (events, locale) {
    try {
        const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${events}?lang=${locale}`
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
