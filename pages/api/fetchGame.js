import cookie from 'cookie'
import getConfig from 'next/config'
import fetch from 'node-fetch'

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null

    // TODO : get event name from request (shortname)
    const { serverRuntimeConfig } = getConfig()
    const { EVENT_NAME } = serverRuntimeConfig
    const cookieName = `rtsevents-${EVENT_NAME}`

    // Check if rts-event cookie is available
    if (req.headers.cookie) {
        cookies = cookie.parse(req.headers.cookie ?? '')
        rtsEventCookie = cookies[cookieName]
        const cookieValue = JSON.parse(cookies[cookieName])
        const { userID, code } = cookieValue

        if (rtsEventCookie) {
            const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF/${userID}/getData`, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code })
            })

            if (response.status === 200) {
                const content = await response.json()
                res.status(200).send(JSON.stringify(content))
            } else {
                res.status(401).end()
            }
        } else {
            res.status(401).end()
        }
    } else {
        res.status(401).end()
    }
}
