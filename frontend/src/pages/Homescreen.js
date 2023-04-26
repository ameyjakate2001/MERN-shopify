import React, { useEffect } from 'react'
import Product from '../components/Product'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getProuctList } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Heading from '../components/Heading'

const Homescreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  console.log(productList)

  useEffect(() => {
    dispatch(getProuctList())
  }, [dispatch])

  return (
    <React.Fragment>
      <Heading headingText='Latest Products' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='error' msg={error} />
      ) : (
        <Grid container spacing={5}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Product key={product._id} product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Homescreen
