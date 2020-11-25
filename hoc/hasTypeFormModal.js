import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
import { ColorBorderButton } from '../components/ui/button/ColorBorderButton'
import Box from '@material-ui/core/Box'

class HasTypeFormModal extends React.Component {
    constructor (props) {
        super(props)
        this.openForm = this.openForm.bind(this)
    }

    openForm () {
        this.typeformEmbed.typeform.open()
    }

    render () {
        return (
            <div className="ExamplePopup">
                <ReactTypeformEmbed
                    popup
                    autoOpen={false}
                    url="https://demo.typeform.com/to/njdbt5"
                    hideHeaders
                    hideFooter
                    buttonText="Go!"
                    style={{ top: 100 }}
                    ref={tf => {
                        this.typeformEmbed = tf
                    }}
                />
                <Box style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }} >
                    <ColorBorderButton key={'goToFeedBackForm'} variant="outlined" className={'buttonAlt'} onClick={this.openForm}>
                                    FeedBack
                    </ColorBorderButton>
                </Box>
            </div>
        )
    }
}

export default HasTypeFormModal
