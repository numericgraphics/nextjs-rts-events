import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        background: 'white',
        minWidth: 275,
        margin: '1rem',
        cursor: 'pointer',
    }
});

export default function PossibleAnswer(props) {
    const classes = useStyles();

    return (
        <Grid item><Button variant="contained">{props.val}</Button></Grid>
    );
}