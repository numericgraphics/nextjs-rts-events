import cookie from 'cookie'
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
            res.status(200).send(JSON.stringify({ user: { nickname: 'bidule', avatarURL: 'https://cdn.rts.ch/rtschallengeassets/avatars/fevi-prod/fevi10.png' } }))
        } else {
            res.status(401).end()
        }
    } else {
        res.status(401).end()
    }
}
