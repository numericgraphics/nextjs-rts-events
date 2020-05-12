import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'


export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        background: '#333',
        border: 0,
        color: 'white',
        width: '100vw',
        maxWidth: '24rem',
        margin: '0 auto 0',
        minHeight: '25rem',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },

    backToHome: {
        margin: 0,
        fontSize: '0.8em',
        position: 'absolute',
        left: 0,
        zIndex: 33,
    }
});

export default function EventLayout({ children, home }) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            <header className={classes.header}>
                {home && (
                    <h1 className={utilStyles.heading2Xl}>Events by {' '}
                        <a href="https://www.rts.ch">RTS</a>
                    </h1>
                )}
                {!home && (
                    <div className={classes.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </header>

            <main>{children}</main>

        </div>
    )
}