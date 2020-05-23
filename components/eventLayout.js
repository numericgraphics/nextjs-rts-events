import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'


export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        background: '#333',
        border: 0,
        color: '#fff',
        width: '100vw',
        maxWidth: '24rem',
        margin: '0 auto 0',
        minHeight: '25rem',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    }
});

export default function EventLayout({ children, home }) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Head>
                <meta name="description" content="Test RTS Event PWA" />
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta name="description" content="Description"/>
                <meta name="keywords" content="Keywords"/>
                <meta name="full-screen" content="yes"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="browsermode" content="application"/>

                <link rel="icon" href="/favicon.ico" />
                <link rel='manifest' href='/manifest.json' />
            </Head>
            <header className={classes.header}>
                {home && (
                    <h1 className={utilStyles.heading2Xl}>Events by {' '}
                        <a href="https://www.rts.ch">RTS</a>
                    </h1>
                )}
            </header>

            <main>{children}</main>

        </div>
    )
}
