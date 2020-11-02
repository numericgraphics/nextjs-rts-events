import cookie from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null

    try {
        const { eventName, date, time } = await req.body
        const cookieName = `rtsevents-${eventName}`

        const today = new Date()
        const euDate = date.split('-')
        const jour = euDate[0]
        const month = euDate[1]
        const year = euDate[2]
        const hour = time ? time.slice(0, 2) : today.getHours()
        const min = time ? time.slice(2, 4) : today.getMinutes()

        const usDate = new Date(year, month, jour, hour, min)

        var myDate = usDate // Your timezone!
        var myEpoch = myDate.getTime() / 1000.0
        // console.log(myEpoch)

        if (req.headers.cookie) {
            cookies = cookie.parse(req.headers.cookie ?? '')
            rtsEventCookie = cookies[cookieName]
            const cookieValue = JSON.parse(cookies[cookieName])
            const { userID, code } = cookieValue

            if (rtsEventCookie) {
                let url
                if (date || time) {
                    url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userID}/getGame?date=${date}&time=${time}`
                } else {
                    url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userID}/getGame`
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
