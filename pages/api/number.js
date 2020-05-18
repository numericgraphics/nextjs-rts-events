import cookie from 'cookie';

export default async (req, res) => {
    try {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        console.log('API number  - cookies', cookies);
        const cookieValue = JSON.parse(cookies['RTS-Events']);

        console.log('API Profile  - cookie', cookieValue);

        const { number } = await req.body;

        if (!number) {
            throw new Error(' must be provided.')
        }



        // res.setHeader('Set-Cookie', serialize('RTS-Events', {number}, { path: '/' }));
        res.status(200).end()
    } catch (error) {
        res.status(400).send(error.message)
    }
}
