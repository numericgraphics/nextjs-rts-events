import fetch from 'node-fetch'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {
    try {
        const url = `${serverRuntimeConfig.API_BASE_URL}${serverRuntimeConfig.API_STAGE}/events/WF` // FIXME: WF???

        const response = await fetch(url)
        const content = await response.json()

        if (response.status !== 200) {
            throw new Error('There is a probleme with your phone')
        }

        res.status(200).send(JSON.stringify(content))
    } catch (error) {
        res.status(400).send(error.message)
    }
}
