import React, {useEffect, useState} from 'react'
import getConfig from 'next/config'
import Router from 'next/router'
import fetch from 'node-fetch';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EventLayout from '../components/eventLayout'
import Gift from '../components/gift'
import SwipeableViews from 'react-swipeable-views'


const {publicRuntimeConfig} = getConfig()
const {API_URL} = publicRuntimeConfig
const loadingElement = <div><p style={{textAlign: 'center'}}> Loading process ! </p></div>;
const dev = API_URL === 'dev';
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh';

function Gifts(props) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    function createSlides() {
        return (<SwipeableViews
                    enableMouseEvents
                    onChangeIndex={(index, indexLatest, meta) => {
                            console.log('index', index);
                        }}
                >
                    {props.data.gifts.map((item, index) => {
                    return(
                        <Gift key={index} description={item.description}/>
                    )
        })}
        </SwipeableViews>)
    }

    return (
        <EventLayout>
           { isLoading ? loadingElement : createSlides() }
        </EventLayout>
    )
}

export async function getStaticProps() {
    try {
        let data;
        try {
            const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/challenges/NIFFF');
            data = await response.json();
        } catch(err) {
            data = {message: 'no-data'};
        }

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
