import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
    Grid,
    Button,
    CardMedia,
    Typography,
    List,
    ListItem,
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getProuctDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addItemToCart } from '../actions/cartActions'

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'inherit',

        '& > *': {
            marginTop: 20,
            fontWeight: '500',
            letterSpacing: 1.25
        },
    },
    grid: {
        marginTop: 20,
    }
}));


const ProductScreen = ({ match, history }) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, product, error } = productDetails

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    useEffect(() => {
        dispatch(getProuctDetails(match.params.id))
    }, [match, dispatch])

    const [quantity, setQuantity] = useState(1)

    const addToCart = () => {
        dispatch(addItemToCart(product._id, quantity))
        history.push(`/cart`)
    }

    return (
        <React.Fragment>
            <Link to='/' className={classes.link}>
                <Button color="inherit">Go Back</Button>
            </Link>
            {
                loading ? <Loader /> :
                    error ? <Message type="error" msg={error} /> :
                        <Grid container spacing={5} className={classes.grid} >
                            <Grid item xs={12} md={6}>
                                <CardMedia component='img' src={product.image} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <List>
                                    <ListItem divider={true}>
                                        <Typography variant='h5'>
                                            {product.name}
                                        </Typography>
                                    </ListItem>
                                    <ListItem divider={true}>
                                        <Typography variant='subtitle1'>
                                            Price: ${product.price}
                                        </Typography>
                                    </ListItem>
                                    <ListItem divider={true}>
                                        <Rating name="half-rating-read" defaultValue={0} value={product.rating} precision={0.5} readOnly />
                                    </ListItem>
                                    <ListItem>
                                        <Typography variant='body1'>
                                            Description: {product.description}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <List style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                    <ListItem divider={true}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant='body1'>
                                                    Price:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body1'>
                                                    {product.price}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem divider={true}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant='body1'>
                                                    Status:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body1'>
                                                    {product.countInStock > 0 ? 'In Stock' : 'out of stock'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {product.countInStock > 0 &&
                                        <ListItem divider={true}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant='body1'>
                                                        Qty:
                                            </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="filled">
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            value={quantity}
                                                            onChange={handleQuantityChange}
                                                        >
                                                            {
                                                                Array.from(Array(product.countInStock), (e, i) => {
                                                                    return (<MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    }
                                    <ListItem style={{ justifyContent: 'center' }}>
                                        <Button color='secondary' variant='contained' disabled={product.countInStock === 0} onClick={addToCart}>
                                            add to cart
                                        </Button>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
            }

        </React.Fragment>
    )
}

export default ProductScreen
