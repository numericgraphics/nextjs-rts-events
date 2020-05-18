import { serialize } from 'cookie';

export default async (req, res) => {
  const { phone } = await req.body
  console.log('API signup  - phone', phone);
  try {
    if (!phone) {
      throw new Error('phone must be provided.')
    }

    res.setHeader('Set-Cookie', serialize('RTS-Events',  JSON.stringify({phone}), { path: '/' }));
    res.status(200).end()
  } catch (error) {
    res.status(400).send(error.message)
  }
}
