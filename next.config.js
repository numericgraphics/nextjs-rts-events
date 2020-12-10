const dotenv = require('dotenv')
dotenv.config()

// SOURCE TO CHECK
// https://github.com/vercel/next.js/blob/canary/examples/auth0/next.config.js

module.exports = {
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        USE_MOCK: false
    },
    serverRuntimeConfig: {
        EVENT_NAME: 'NIFF',
        IMAGE_BASE_URL: 'https://rts-challenge.s3.eu-central-1.amazonaws.com/rtschallengeassets',
        API_BASE_URL: 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com',
        // API_STAGE: '/prod'
        API_STAGE: '/dev'
        // API_STAGE: '/latest'
        // API_STAGE: '/beta'
        // API_BASE_URL: 'http://localhost:3001',
        // API_STAGE: ''
    },
    i18n: {
        locales: ['it', 'fr', 'de', 'rm', 'en'],
        defaultLocale: 'fr'
    }
}
