import React from 'react'
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActionArea
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    name: {
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    link: {
        color: 'inherit'
    }
});

const Product = ({ product }) => {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="img"
                    image={product.image}
                    height="200"
                />
                <CardContent>
                    <Typography className={classes.name} gutterBottom variant="subtitle2">
                        <Link to={`/product/${product._id}`} className={classes.link}>
                            {product.name}
                        </Link>
                    </Typography>
                    <Rating
                        name="half-rating-read"
                        size="small"
                        defaultValue={0}
                        value={product.rating}
                        precision={0.5}
                        style={{ marginBottom: 5 }}
                        readOnly
                    />
                    <Typography gutterBottom variant="h5">
                        ${product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Product
