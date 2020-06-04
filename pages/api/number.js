import cookie, { serialize } from 'cookie'
import fetch from 'node-fetch'

let userData = {}
export default async (req, res) => {
    try {
        const { code } = await req.body
        if (!code) {
            throw new Error('Your code must be provided.')
        }

        const cookies = cookie.parse(req.headers.cookie ?? '')
        const rtsEventCookie = cookies['RTS-Events']
        if (rtsEventCookie) {
            const cookieValue = JSON.parse(cookies['RTS-Events'])
            userData = {
                userID: cookieValue.userID,
                code: code
            }

            const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/${userData.userID}/getData`, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: userData.code })
            })

            console.log('api number - response status', response.status)

            if (response.status === 401) {
            // kill cookie
                const cookieSerialized = cookie.serialize('RTS-Events', '', {
                    sameSite: 'lax',
                    secure: false,
                    maxAge: -1,
                    httpOnly: true,
                    path: '/'
                })
                res.setHeader('Set-Cookie', cookieSerialized)
                throw new Error('The code used is not the right one')
            }

            if (response.status !== 200) {
                throw new Error('There is a issue with the createOrSync request')
            }
        } else {
            throw new Error('There is a issue with the cookie RTS-Events')
        }

        res.setHeader('Set-Cookie', serialize('RTS-Events', JSON.stringify({
            userID: userData.userID,
            code: userData.code
        }), { path: '/', maxAge: 60 * 60 * 24 * 14 }))

        res.status(200).end()
    } catch (error) {
        res.status(400).send(error.message)
    }
}
