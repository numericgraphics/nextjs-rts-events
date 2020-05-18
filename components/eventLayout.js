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
            </header>

            <main>{children}</main>

        </div>
    )
}