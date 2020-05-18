import cookie, { serialize } from 'cookie';
import fetch  from 'node-fetch';
// const fetch = require("node-fetch");

export default async (req, res) => {
  const { phone } = await req.body
  console.log('API signup  - phone', phone);
  try {
    if (!phone) {
      throw new Error('phone must be provided.')
    }

    // Check if rts-event cookie is available
    console.log('API signup  - headers cookie', req.headers.cookie);
    if (req.headers.cookie){
      const cookies = cookie.parse(req.headers.cookie ?? '');
      const rtsEventCookie = cookies['RTS-Events'];

      // if rts-event cookie is available call getData
      if(rtsEventCookie){
        const cookieValue = JSON.parse(cookies['RTS-Events']);
        console.log('API signup  - userID', cookieValue.userID);
        console.log('API signup  - code', cookieValue.code);
        if(cookieValue.code){
          // getData to get timeline and send 200

          const code = cookieValue.code;
            const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/${cookieValue.userID}/getData`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code }),
            })

          if (response.status === 200) {
            res.status(200).end()
          }else{
            throw new Error('Error trying calling the getData api');
          }


        }else{
          // user gone receive code, 302 to redirect to Number page
          res.status(302).end()
        }
      }
    } else {
      // try {
      //   const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/createOrSyncUser', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: { "num": phone },
      //   })
      //
      //   if (response.status !== 200) {
      //     throw new Error(await response.text())
      //   }
      //
      // } catch (error) {
      //   console.error('create user error:', error)
      //   throw new Error('User already exists.')
      // }

      res.setHeader('Set-Cookie', serialize('RTS-Events',  JSON.stringify({userID: 'plouf', code: '34'}), { path: '/' }));
      // res.setHeader('Set-Cookie', serialize('RTS-Events',  JSON.stringify({userID: 'plouf'}), { path: '/' }));
      res.status(302).end()
    }



  } catch (error) {
    res.status(400).send(error.message)
  }
}
