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
        console.log(this.props.test)
        return (
            <div className="ExamplePopup">
                <ReactTypeformEmbed
                    popup
                    autoOpen={false}
                    url={`${this.props.url}`}
                    hideHeaders
                    hideFooter
                    buttonText="Go!"
                    style={{ top: 100 }}
                    ref={tf => {
                        this.typeformEmbed = tf
                    }}
                />
                <Box style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 15 }} >
                    <ColorBorderButton key={'goToFeedBackForm'} variant="outlined" className={'buttonAlt'} style={{ width: '100%' }} onClick={this.openForm}>
                        {`${this.props.text}`}
                    </ColorBorderButton>
                </Box>
            </div>
        )
    }
}

export default HasTypeFormModal
