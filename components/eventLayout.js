import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'

export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '1rem',
        'max-width': '36rem',
        margin: '3rem auto 6rem'
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
        <Paper className={classes.root}>
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