import cookie, { serialize } from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

let userData = {}

export default async (req, res) => {
    try {
        const { code, eventName } = await req.body
        const cookieName = `rtsevents-${eventName}`

        if (!code) {
            throw new Error('Your code must be provided.')
        }

        const cookies = cookie.parse(req.headers.cookie ?? '')
        const rtsEventCookie = cookies[cookieName]
        if (rtsEventCookie) {
            const cookieValue = JSON.parse(cookies[cookieName])
            userData = {
                userID: cookieValue.userID,
                code: code
            }

            const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userData.userID}/getUser`

            const response = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: userData.code })
            })

            if (response.status === 200) {
                // Get body data to set the useID in the cookie
                const content = await response.json()
                res.setHeader('Set-Cookie', serialize(cookieName, JSON.stringify({
                    userID: userData.userID,
                    code: userData.code
                }), { path: '/', maxAge: 60 * 60 * 24 * 14 }))

                res.status(200).send(JSON.stringify(content))
            }

            if (response.status !== 200) {
            // kill cookie
                const cookieSerialized = cookie.serialize(cookieName, '', {
                    sameSite: 'lax',
                    secure: false,
                    maxAge: -1,
                    httpOnly: true,
                    path: '/'
                })
                res.setHeader('Set-Cookie', cookieSerialized)
                throw new Error('The code used is not the right one')
            }
        } else {
            throw new Error('There is a issue with the cookie RTS-Events')
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
