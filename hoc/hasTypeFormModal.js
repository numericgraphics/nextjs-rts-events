import React, { useEffect, useRef, forwardRef } from 'react'
import * as typeformEmbed from '@typeform/embed'

function hasTypeFormModal (props, ref) {
    // eslint-disable-next-line react/display-name
    const typeformRef = useRef(null)
    const gameStats = props.gameStats

    useEffect(() => {
        typeformEmbed.makePopup(
            `${gameStats && gameStats.feedbackURL}`,
            {
                mode: 'popup',
                open: 'time',
                openValue: 30,
                autoClose: 3,
                hideScrollbars: true,
                onSubmit: function () {
                    props.setOpenFeedback(false)
                },
                onClose: function () {
                    props.setOpenFeedback(false)
                }
            }
        )
    }, [typeformRef])

    return (
        <div ref={typeformRef} ></div>
    )
}

export default forwardRef(hasTypeFormModal)
