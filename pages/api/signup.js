import cookie, { serialize } from 'cookie';
import fetch  from 'node-fetch';
// const fetch = require("node-fetch");

let userData = {};

export default async (req, res) => {
  const { phone } = await req.body;
  try {
    if (!phone) {
      throw new Error('phone must be provided.')
    }

    // Check if rts-event cookie is available
    let rtsEventCookie = null;
    let cookies = null;
    if (req.headers.cookie) {
      cookies = cookie.parse(req.headers.cookie ?? '');
      rtsEventCookie = cookies['RTS-Events'];
    }
    // if rts-event cookie is available
    if(rtsEventCookie !== null){
      const cookieValue = JSON.parse(cookies['RTS-Events']);
      // Cookie contain userID and code
      if(cookieValue.code){
        // getData to get timeline
        const code = cookieValue.code;
        const response = await fetch(`https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/${cookieValue.userID}/getData`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })

        // validate request
        if (response.status === 200) {
          res.status(200).end()
        }else{
          // kill cookie
          const cookieSerialized = cookie.serialize('RTS-Events', '', {
            sameSite: 'lax',
            secure: false,
            maxAge: -1,
            httpOnly: true,
            path: '/',
          });
          res.setHeader('Set-Cookie', cookieSerialized);
          throw new Error('Error trying calling the getData api');
        }


      }else{
        // cookie dont have code property
        // user will receive sms code, 302 to redirect to Code page
        res.status(302).end()
      }
    } else {
      // No cookie
      try {
        const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/createOrSync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'num': phone }),
        });

        //Get body data to set the useID in the cookie
        const content = await response.json();

        userData = {
          userID: content.userID
        };
        console.log('response content', content.userID);

        if (response.status !== 200) {
          throw new Error(await response.text())
        }

      } catch (error) {
        throw new Error('User already exists.')
      }

      res.setHeader('Set-Cookie', serialize('RTS-Events',  JSON.stringify({userID: userData.userID}), { path: '/' }));
      res.status(302).end()
    }



  } catch (error) {
    res.status(400).send(error.message)
  }
}
