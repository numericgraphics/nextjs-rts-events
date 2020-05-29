export default async (req, res) => {
    try {
        // const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/createOrSync', {
        //     credentials: 'include',
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ 'num': phone }),
        // });
        res.status(200).end()
    }catch (error) {
        res.status(400).send(error.message)
    }
}
