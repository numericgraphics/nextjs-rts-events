import React from 'react'

const styles = {
    slide: {
        minHeight: '100vh',
        backgroundColor: 'red'
    },
    slideHeader: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        width: '100%',
        minHeight: '30vh',
        backgroundColor: 'pink',
        zIndex: 1
    },
    slideTitle: {
        width: '100%',
        minHeight: '10vh',
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: '2rem',
        color: 'green'
    },
    slideDescription: {
        // width: '100%',
        textAlign: 'center',
        color: 'white'
    }
}

export default function Gift (props) {
    return (
        <div style={styles.slide}>
            <div style={styles.slideHeader}>
                <div style={styles.slideTitle}>
                    <p>Titre</p>
                </div>
                <div style={styles.slideDescription}>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}
