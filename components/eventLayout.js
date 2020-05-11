import Head from 'next/head'
import styles from './eventLayout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Events by RTS'
export const siteTitle = 'TODO:SiteTitle'

export default function EventLayout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            <header className={styles.header}>
                <h1 className={utilStyles.heading2Xl}>Events by {' '}
                    <a href="https://www.rts.ch">RTS</a>
                </h1>
            </header>

            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}