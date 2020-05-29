
import fetch from "node-fetch";

export default async (req, res) => {
    try {
        const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/challenges/NIFFF');
        const data = await response.json();
        res.status(200).json(data);
    }catch (error) {
        res.status(400).send(error.message)
    }
}
