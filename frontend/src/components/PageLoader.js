import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        width: '80%',
        marginTop: '20%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    name: {
        textTransform: 'uppercase',
        fontSize: 30,
        letterSpacing: 3,
        marginBottom: 10
    }
});

const PageLoader = () => {

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography className={classes.name} variant='h6' color='secondary' align='center'>
                MernShop
            </Typography>
            <LinearProgress color="secondary" />
        </div>
    )
}

export default PageLoader

