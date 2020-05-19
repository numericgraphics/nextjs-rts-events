import Head from 'next/head'
import Layout, { siteTitle } from '../components/eventLayout'
import ChallengeCard from '../components/challengeCard'
import utilStyles from '../styles/utils.module.css'
import { getSortedChallengesData } from '../lib/challenges'
import Link from 'next/link'
import Date from '../components/date'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import React, {useEffect, useState} from "react";
import Router from "next/router";



export async function getStaticProps() {
    const allChallengesData = getSortedChallengesData()
    return {
        props: {
            allChallengesData
        }
    }
}

const verifyElement = <div><p style={{textAlign: 'center'}}> Process to verify your account ! </p></div>;
const useStyles = makeStyles({

});


export default function Home({ allChallengesData }) {
    const [isVerify, setVerify] = useState(true);

    async function handleVerify() {
        try {
            const response = await fetch('/api/verify');

            if (response.status === 200) {
                setVerify(false);
            }else {
                Router.push('/')

            }

        } catch (error) {
            setVerify(false);
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        handleVerify().then();
    }, []);


    return (
        <Layout home>
            {isVerify ? verifyElement :
                <div>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={[utilStyles.headingMd, utilStyles.paddingLR]}>
                <p>
                    Venez tester vos connaissances sportives et tentez de gagner des cadeaux!!
                </p>
            </section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.paddingB}`}>

                {allChallengesData.map(({ id, date, title, accroche, backgroundImage }) => (
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{
                            scale: 0.8,
                            rotate: -10,
                            borderRadius: "100%"
                        }}
                    >
                        <ChallengeCard key={id} cardTitle={title} date={date} challengeID={id} accroche={accroche} image={backgroundImage} />
                    </motion.div>
                ))}

            </section>
                </div>}
        </Layout>
    )
}
