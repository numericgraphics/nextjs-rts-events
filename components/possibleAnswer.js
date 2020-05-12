import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        margin: '10px 5px 0 5px',
    }
});

export default function PossibleAnswer(props) {

    const classes = useStyles();

    return (
        <Grid item className={classes.root}><Button variant="contained" >{props.val}</Button></Grid>
    );
}