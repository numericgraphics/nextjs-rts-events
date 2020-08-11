import { serialize } from 'cookie'
import fetch from 'node-fetch'

let userData = {}

export default async (req, res) => {
    try {
        const { phone, eventName } = await req.body
        const cookieName = `rtsevents-${eventName}`

        if (!phone) {
            throw new Error('phone must be provided.')
        }
        const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/${eventName}/createOrSync`, {
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
