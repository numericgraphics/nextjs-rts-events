const dotenv = require('dotenv')
dotenv.config()

// SOURCE TO CHECK
// https://github.com/vercel/next.js/blob/canary/examples/auth0/next.config.js

module.exports = {
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        USE_MOCK: false
    }
}
