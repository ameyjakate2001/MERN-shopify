import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import {
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import Heading from '../components/Heading'

const Cartscreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const checkout = () => {
    if (userInfo) {
      history.push('/checkout')
    } else {
      history.push('/signin')
    }
  }

  return (
    <React.Fragment>
      <Heading headingText='Cart Items' />
      {cartItems.length === 0 ? (
        <Message type='info' msg='cart is empty!' />
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <List>
              {cartItems.map((Item, i) => {
                return (
                  <ListItem
                    key={Item.product}
                    divider={i !== cartItems.length - 1}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <CardMedia component='img' src={Item.image} />
                      </Grid>
                      <Grid item xs={4}>
                        <Link to={`/product/${Item.product}`} className='link'>
                          <Typography variant='button'>{Item.name}</Typography>
                        </Link>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant='body1'>${Item.price}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl variant='filled'>
                          <Select
                            labelId='demo-simple-select-filled-label'
                            id='demo-simple-select-filled'
                            value={Item.quantity}
                            onChange={(e) =>
                              dispatch(
                                addItemToCart(
                                  Item.product,
                                  Number(e.target.value)
                                )
                              )
                            }
                          >
                            {Array.from(Array(Item.countInStock), (e, i) => {
                              return (
                                <MenuItem key={i + 1} value={i + 1}>
                                  {i + 1}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => removeItem(Item.product)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <List style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <ListItem
                divider={true}
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant='button'>
                  Subtotal (
                  {cartItems.reduce((acc, Item) => acc + Item.quantity, 0)})
                  Items:
                </Typography>
                <Typography variant='body1'>
                  $
                  {cartItems
                    .reduce((acc, Item) => acc + Item.quantity * Item.price, 0)
                    .toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem style={{ justifyContent: 'center' }}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Cartscreen
