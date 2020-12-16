import { serialize } from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

let userData = {}

export default async (req, res) => {
    try {
        const { phone, eventName, locale } = await req.body
        const cookieName = `rtsevents-${eventName}`

        if (!phone) {
            throw new Error('phone must be provided.')
        }

        const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/createOrSync?lang=${locale}`

        const response = await fetch(url, {
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
    } catch (error) {
        res.status(400).send(error.message)
    }
}
