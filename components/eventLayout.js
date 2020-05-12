import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'

export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        background: '#333',
        border: 0,
        color: 'white',
        //padding: '1rem',
        'max-width': '24rem',
        margin: '0 auto 6rem'
    },
    header: {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center'
    },
    backToHome: {
        margin: '3rem 0 0'
    }
});

export default function EventLayout({ children, home }) {

    const classes = useStyles();

    return (
        <Paper className={classes.root} square>
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
            </header>

            <main>{children}</main>
            {!home && (
                <div className={classes.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </Paper>
    )
}