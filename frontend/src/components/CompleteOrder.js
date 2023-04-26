import React from 'react'
import Heading from './Heading'
import {
    Button,
    Grid,
    List,
    ListItem,
    Typography,
    CardMedia,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    back: {
        marginBottom: 10
    },
    block: {
        width: '100%',

        '& span': {
            color: 'grey',
            textTransform: 'uppercase'
        }

    }
})

const CompleteOrder = ({ handleBack }) => {

    const classes = useStyles()

    const cart = useSelector((state) => state.cart)


    const { cartItems, shippingAddress, paymentMethod } = cart

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimal(cartItems.reduce((sum, Item) => sum + Item.quantity * Item.price, 0))
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 5)
    cart.taxPrice = addDecimal(cart.itemsPrice * 0.18)
    cart.totalPrice = addDecimal(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    const address = `${shippingAddress.address}, ${shippingAddress.city}- ${shippingAddress.pinCode}, ${shippingAddress.country}`

    return (
        <React.Fragment>
            <Heading headingText='Order' />
            <Button onClick={handleBack} className={classes.back}>Back</Button>

            { cartItems.length === 0 ?
                <Message type='info' msg='Cart is empty' /> :
                <Grid container spacing={10}>
                    <Grid item md={8}>
                        <List>
                            <ListItem divider={true}>
                                <Typography className={classes.block} paragraph={true} variant='h6'>
                                    <span>Shipping</span>
                                </Typography>
                                <Typography variant='subtitle' className={classes.block}>
                                    {address}
                                </Typography>
                            </ListItem>
                            <ListItem divider={true}>
                                <Typography className={classes.block} paragraph={true} variant='h6'>
                                    <span> Payment Method</span>
                                </Typography>
                                <Typography variant='subtitle' className={classes.block}>
                                    {paymentMethod}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <List>
                                    {
                                        cartItems.map((Item, i) => {
                                            return (
                                                <ListItem key={Item.product} divider={i !== cartItems.length - 1}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <CardMedia component='img' src={Item.image} />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Link to={`/product/${Item.product}`} className='link'>
                                                                <Typography variant='button'>
                                                                    {Item.name}
                                                                </Typography>
                                                            </Link>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant='body1'>
                                                                {Item.quantity} x ${Item.price} = ${(Item.quantity * Item.price).toFixed(2)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <List style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                            <ListItem divider={true} style={{ justifyContent: 'space-between' }}>
                                <Typography variant='subtitle'>
                                    ItemsPrice:
                                </Typography>
                                <Typography variant='body1'>
                                    ${cart.itemsPrice}
                                </Typography>
                            </ListItem>
                            <ListItem divider={true} style={{ justifyContent: 'space-between' }}>
                                <Typography variant='subtitle'>
                                    ShippingPrice:
                                </Typography>
                                <Typography variant='body1'>
                                    ${cart.shippingPrice}
                                </Typography>
                            </ListItem>
                            <ListItem divider={true} style={{ justifyContent: 'space-between' }}>
                                <Typography variant='subtitle'>
                                    TaxPrice:
                                </Typography>
                                <Typography variant='body1'>
                                    ${cart.taxPrice}
                                </Typography>
                            </ListItem>
                            <ListItem divider={true} style={{ justifyContent: 'space-between' }}>
                                <Typography variant='subtitle'>
                                    TotalPrice:
                                </Typography>
                                <Typography variant='body1'>
                                    ${cart.totalPrice}
                                </Typography>
                            </ListItem>
                            <ListItem style={{ justifyContent: 'center' }}>
                                <Button variant='contained' color='secondary'>
                                    Checkout
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            }

        </React.Fragment>
    )
}

export default CompleteOrder
