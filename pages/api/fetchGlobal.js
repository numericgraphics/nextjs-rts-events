import fetch from 'node-fetch'

export default async (req, res) => {
    try {
        const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF')
        const content = await response.json()

        if (response.status !== 200) {
            throw new Error('There is a probleme with your phone')
        }

        res.status(200).send(JSON.stringify(content))
    } catch (error) {
        res.status(400).send(error.message)
    }
}
