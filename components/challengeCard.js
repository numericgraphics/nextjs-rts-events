import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import { motion } from 'framer-motion';




const useStyles = makeStyles({
    root: {
        position: 'relative',
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
    media: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        'z-index': 0,
        top: 0,
        left: 0,
        opacity: 0.2,
    },
    content: {
        position: 'relative',
        'z-index': 1,
    },
});

export default function ChallengeCard(props) {
    const classes = useStyles();
    const id = props.challengeID;
    console.log(props);

    return (
        <Link href="/challenges/[id]" as={`/challenges/${id}`}>

            <Card className={classes.root}>
                <CardActions>
                    <CardMedia
                        className={classes.media}
                        image={props.image}
                    />

                    <CardContent
                        className={classes.content}
                    >

                        {/*
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.cardTitle}
                    </Typography>
                    */}

                        <Typography variant="h5" component="h2">
                            {props.cardTitle}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {props.date}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.accroche}
                        </Typography>
                    </CardContent>
                </CardActions>
            </Card>
        </Link>
    );
}