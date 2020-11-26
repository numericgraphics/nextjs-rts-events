import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
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
        const Button = this.props.buttonComp

        return (
            <React.Fragment>
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
                <Box style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 15, width: this.props.buttonWidth ? this.props.buttonWidth : '80%' }} >
                    <Button
                        color={this.props.color ? this.props.color : 'default'}
                        key={'goToFeedBackForm'}
                        variant={this.props.variant}
                        className={this.props.buttonClassName ? this.props.buttonClassName : 'button'}
                        style={{ width: '100%' }}
                        onClick={this.openForm}>
                        {`${this.props.text}`}
                    </Button>
                </Box>
            </React.Fragment>
        )
    }
}

export default HasTypeFormModal
