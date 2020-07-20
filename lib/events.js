import fetch from 'node-fetch'

export async function getAllEvents () {
    try {
        const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/demo/getEvents')
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
        const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/${events}`)
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
