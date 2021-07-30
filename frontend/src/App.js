import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import productScreen from './screens/ProductScreen'
import cartScreen from './screens/cartScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/Product/:id' component={productScreen} />
          <Route path='/cart/:id?' component={cartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
