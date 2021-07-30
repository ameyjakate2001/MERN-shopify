import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { productList } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(productList())
  }, [dispatch])
  const { loading, error, products } = useSelector((state) => state.productList)

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>
          <Message children={error} />
        </h2>
      ) : (
        <Row>
          {products.map((product, index) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product key={product._id} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
