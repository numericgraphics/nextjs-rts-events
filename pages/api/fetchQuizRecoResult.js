import cookie from 'cookie'
import getConfig from 'next/config'
import { dateCreator } from '../../data/tools'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {
    let rtsEventCookie = null
    let cookies = null
    // eslint-disable-next-line no-unreachable
    try {
        const { img, challengeID, eventName, date, time, locale } = await req.body
        const finalDate = ((date && time) || date) ? dateCreator(date, time) : false
        const cookieName = `rtsevents-${eventName}`

        if (req.headers.cookie) {
            cookies = cookie.parse(req.headers.cookie ?? '')
            rtsEventCookie = cookies[cookieName]
            const cookieValue = JSON.parse(cookies[cookieName])
            const { userID, code } = cookieValue

            // TODO verify the validity of this data
            if (challengeID === undefined || img === undefined) {
                throw new Error('challengeID or answer must be provided.')
            }

            if (rtsEventCookie) {
                const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/${eventName}/${userID}/challenges/${challengeID}/reco?lang=${locale}${finalDate ? `&ts=${finalDate}` : ''}`
                const response = await fetch(url, {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, img })
                }
                )
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
