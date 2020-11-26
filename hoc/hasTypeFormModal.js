import React, { useEffect, useRef } from 'react'
import * as typeformEmbed from '@typeform/embed'

const hasTypeFormModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const typeformRef = useRef(null)
        const gameStats = props.gameStats

        useEffect(() => {
            typeformEmbed.makePopup(
                `${gameStats && gameStats.feedbackURL}`,
                {
                    mode: 'drawer_left',
                    open: 'time',
                    openValue: 30,
                    autoClose: 3,
                    hideScrollbars: true,
                    onSubmit: function () {
                        console.log('Typeform successfully submitted')
                        props.setOpenFeedback(false)
                    },
                    onReady: function () {
                        console.log('Typeform is ready')
                    },
                    onClose: function () {
                        console.log('Typeform is closed')
                        props.setOpenFeedback(false)
                    }
                }
            )
        }, [typeformRef])

        return (
            <div ref={typeformRef} ></div>
        )
    }
}

export default hasTypeFormModal
