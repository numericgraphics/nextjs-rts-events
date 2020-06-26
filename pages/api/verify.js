import cookie from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'

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

        if (rtsEventCookie) {
            const cookieValue = JSON.parse(cookies[cookieName])
            if (cookieValue.code) {
                // getData to get timeline
                const code = cookieValue.code
                const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF/${cookieValue.userID}/getUser`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code })
                })

                // validated request
                if (response.status === 200) {
                    const content = await response.json()
                    const { nickname, avatarURL } = content
                    res.status(200).send(JSON.stringify({ user: { nickname, avatarURL } }))
                } else {
                    // kill cookie
                    const cookieSerialized = cookie.serialize(cookieName, '', {
                        sameSite: 'lax',
                        secure: false,
                        maxAge: -1,
                        httpOnly: true,
                        path: '/'
                    })
                    res.setHeader('Set-Cookie', cookieSerialized)
                    throw new Error('Error account syn, try again')
                }
            }
        }
    }
    res.status(303).end()
}
