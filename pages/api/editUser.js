import cookie from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null

    try {
        const { eventName, avatarURL, nickname } = await req.body
        const cookieName = `rtsevents-${eventName}`

        if (req.headers.cookie) {
            cookies = cookie.parse(req.headers.cookie ?? '')
            rtsEventCookie = cookies[cookieName]
            const cookieValue = JSON.parse(cookies[cookieName])
            const { userID, code } = cookieValue
            const body = {
                code: code,
                ...(nickname !== undefined && { nickname }),
                ...(avatarURL !== undefined && { avatarURL })
            }
            if (rtsEventCookie) {
                const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userID}`

                const response = await fetch(url, {
                    credentials: 'include',
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
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
