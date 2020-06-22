import cookie, { serialize } from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'

let userData = {}

export default async (req, res) => {
    const { phone } = await req.body
    const { serverRuntimeConfig } = getConfig()
    const { EVENT_NAME } = serverRuntimeConfig
    const cookieName = `RTS-Events-${EVENT_NAME}`

    try {
        if (!phone) {
            throw new Error('phone must be provided.')
        }
        // Check if rts-event cookie is available
        let rtsEventCookie = null
        let cookies = null

        if (req.headers.cookie) {
            cookies = cookie.parse(req.headers.cookie ?? '')
            rtsEventCookie = cookies[cookieName]
        }

        // if rts-event cookie is available
        if (rtsEventCookie) {
            const cookieValue = JSON.parse(cookies[cookieName])
            // Cookie contain userID and code
            if (cookieValue.code) {
                // getData to get timeline
                const code = cookieValue.code
                const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/${cookieValue.userID}/getData`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code })
                })

                // validated request
                if (response.status === 200) {
                    res.status(200).end()
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
            } else {
                // cookie dont have code property, user will receive sms code
                console.log('302 ------')
                const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/createOrSync', {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ num: phone })
                })

                // validated request 302 to redirect to Code page
                if (response.status === 200) {
                    res.status(302).end()
                } else {
                    throw new Error('The Phone number sent is not the one registered.')
                }
            }
        } else {
            // No cookie
            const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/createOrSync', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ num: phone })
            })

            // Get body data to set the useID in the cookie
            const content = await response.json()

            userData = {
                userID: content.userID
            }

            if (response.status !== 200) {
                throw new Error('There is a probleme with your phone')
            }
            res.setHeader('Set-Cookie', serialize(cookieName, JSON.stringify({ userID: userData.userID }), { path: '/' }))
            res.status(302).end()
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
