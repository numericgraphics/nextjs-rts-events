import fetch from 'node-fetch'

export default async (req, res) => {
    try {
        const url = 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/' + req.body.event + '/GeoJSON/' + req.body.defi
        // let url = 'http://localhost:3001/mapdata/TDR2021' + '?c=' + req.body.counter

        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status === 200) {
            const content = await response.json()
            res.status(200).send(JSON.stringify(content))
        } else {
            throw new Error('There is a probleme with the getMarkers fetch')
        }
    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
    }
}
