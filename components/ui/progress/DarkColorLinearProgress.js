import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

// TODO - issue importation svg in content pseudo element in chrome, android, color hard coded for review
export const DarkColorLinearProgress = withStyles((theme) => ({
    root: {
        height: 40,
        borderRadius: 20
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.light
    },
    bar: {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.dark,
        '&::before': {
            position: 'absolute',
            right: 15,
            display: 'block',
            content: 'url(\'data:image/svg+xml;utf8,<svg version="1.1" id="iconPhoto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 36.174 36.174" style="enable-background:new 0 0 36.174 36.174;" xml:space="preserve"><g><path fill="lightcyan" d="M23.921,20.528c0,3.217-2.617,5.834-5.834,5.834s-5.833-2.617-5.833-5.834s2.616-5.834,5.833-5.834 S23.921,17.312,23.921,20.528z M36.174,12.244v16.57c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4v-16.57c0-2.209,1.791-4,4-4h4.92 V6.86c0-1.933,1.566-3.5,3.5-3.5h11.334c1.934,0,3.5,1.567,3.5,3.5v1.383h4.92C34.383,8.244,36.174,10.035,36.174,12.244z M26.921,20.528c0-4.871-3.963-8.834-8.834-8.834c-4.87,0-8.833,3.963-8.833,8.834s3.963,8.834,8.833,8.834 C22.958,29.362,26.921,25.399,26.921,20.528z"/></g></svg>\')',
            height: 20,
            width: 20
        }
    },
    determinate: {
        border: `5px ${theme.palette.primary.dark} solid`,
        '&::after': {
            position: 'absolute',
            top: 5,
            right: 10,
            display: 'block',
            content: 'url(\'data:image/svg+xml;utf8, <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17.837 17.837" style="enable-background:new 0 0 17.837 17.837;" xml:space="preserve"><g><path fill="cadetblue" d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27 c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0 L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/></g></svg>\')',
            height: 20,
            width: 20
        }
    }
}))(LinearProgress)
