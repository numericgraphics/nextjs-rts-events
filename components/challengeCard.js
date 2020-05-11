import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'




const useStyles = makeStyles({
    root: {
        background: 'white',
        minWidth: 275,
        margin: '1rem',
        cursor: 'pointer',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ChallengeCard(props) {
    const classes = useStyles();
    const id = props.challengeID;

    return (
        <Link href="/challenges/[id]" as={`/challenges/${id}`}>

            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.cardTitle}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.cardTitle}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.date}
                    </Typography>
                    <Typography variant="body2" component="p">
                        TODO: Description du challenge
                </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}