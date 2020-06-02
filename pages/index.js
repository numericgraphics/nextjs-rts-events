import React, {useEffect, useState} from 'react'
import getConfig from 'next/config'
import Router from 'next/router'
import fetch from 'node-fetch';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../components/eventLayout'


const {publicRuntimeConfig} = getConfig()
const {API_URL} = publicRuntimeConfig

const dev = API_URL === 'dev';
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-pwa.rtsch.now.sh/';

function Gifts(props) {

    useEffect(() => {
        console.log('Gifts - init - props', props);
        console.log('Gifts - init - API_URL', API_URL);
        console.log('Gifts - init - server', server);
    }, []);

    return (
        <Layout>
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Gift Page
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}

export async function getStaticProps({ req }) {
    try {
        const response = await fetch(`${server}/api/init`);
        const data = await response.json()
        return {
            props: {
                data
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export default Gifts
