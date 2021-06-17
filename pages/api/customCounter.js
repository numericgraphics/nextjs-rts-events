import cookie from 'cookie'
import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {

    try {
        const { eventName, counterName, daily } = await req.body
        const body = {
            shortName: eventName,
            counterName: counterName,
            daily: daily ? daily : false
        }
        const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/counters/inc`

        const response = await fetch(url, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
            })

            if (response.status === 200) {
                const content = await response.json()
                res.status(200).send(JSON.stringify(content))
            } else {
                throw new Error('There is a probleme with the getData fetch')
            }

    } catch (error) {
        res.status(401).send(error.message)
    }
}