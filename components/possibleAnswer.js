import { makeStyles } from '@material-ui/core/styles';

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
        <div>{props.val}</div>
    );
}