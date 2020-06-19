import cookie from 'cookie'
import fetch from 'node-fetch'

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null

    // Check if rts-event cookie is available
    if (req.headers.cookie) {
        cookies = cookie.parse(req.headers.cookie ?? '')
        rtsEventCookie = cookies['RTS-Events']

        if (rtsEventCookie) {
            const cookieValue = JSON.parse(cookies['RTS-Events'])
            if (cookieValue.code) {
                // getData to get timeline
                const code = cookieValue.code
                const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF/${cookieValue.userID}/getData`, {
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
                    const cookieSerialized = cookie.serialize('RTS-Events', '', {
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
