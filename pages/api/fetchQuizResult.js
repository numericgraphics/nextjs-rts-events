import cookie from 'cookie'

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null

    // Check if rts-event cookie is available
    try {
        const { answer, challengeID, eventName } = await req.body
        const cookieName = `rtsevents-${eventName}`

        if (req.headers.cookie) {
            cookies = cookie.parse(req.headers.cookie ?? '')
            rtsEventCookie = cookies[cookieName]
            const cookieValue = JSON.parse(cookies[cookieName])
            const { userID, code } = cookieValue

            // TODO verify the validity of this data
            if (challengeID === undefined || answer === undefined) {
                throw new Error('challengeID or answer must be provided.')
            }

            if (rtsEventCookie) {
                const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/${eventName}/${userID}/challenges/${challengeID}/end`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, answer })
                })

                if (response.status === 200) {
                    const content = await response.json()
                    res.status(200).send(JSON.stringify(content))
                } else {
                    throw new Error('There is a probleme with end fetch')
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
