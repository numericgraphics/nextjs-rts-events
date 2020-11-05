import cookie from 'cookie'
import getConfig from 'next/config'
import { dateCreator } from '../../data/tools'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null

    // Check if rts-event cookie is available
    try {
        const { eventName, date, time } = await req.body
        const finalDate = ((date && time) || date) ? dateCreator(date, time) : false
        const cookieName = `rtsevents-${eventName}`

        if (req.headers.cookie) {
            cookies = cookie.parse(req.headers.cookie ?? '')
            rtsEventCookie = cookies[cookieName]
            const cookieValue = JSON.parse(cookies[cookieName])
            const { userID, code } = cookieValue

            if (rtsEventCookie) {
                let url
                if (finalDate) {
                    url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userID}/challenges/startNextAvailableChallenge?date=${finalDate}`
                } else {
                    url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userID}/challenges/startNextAvailableChallenge`
                }
                const response = await fetch(url, {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: code })
                })

                if (response.status === 200) {
                    const content = await response.json()
                    res.status(200).send(JSON.stringify(content))
                } else {
                    throw new Error('There is a probleme with the getData fetch')
                }
            } else {
                throw new Error('There is a no events cookie')
            }
        } else {
            throw new Error('There is a no cookies')
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
}
