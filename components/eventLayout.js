import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Div100vh from 'react-div-100vh';

export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        background: '#333',
        border: 0,
        color: 'white',
        width: '100vw',
        'max-width': '24rem',
        margin: '0 auto 6rem',
        maxHeight: '45rem',
        minHeight: '25rem',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    main: {
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    backToHome: {
        margin: 0,
        fontSize: '0.8em',
        position: 'absolute',
        left: 0,
    }
});

export default function EventLayout({ children, home }) {

    const classes = useStyles();

    return (
        <Div100vh className={classes.root}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            <header className={classes.header}>
                <h1 className={utilStyles.heading2Xl}>Events by {' '}
                    <a href="https://www.rts.ch">RTS</a>
                </h1>
                {!home && (
                    <div className={classes.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </header>

            <main className={classes.main}>{children}</main>

        </Div100vh>
    )
}