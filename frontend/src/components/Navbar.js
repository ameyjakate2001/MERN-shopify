import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogoutAction } from '../actions/userActions'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  btns: {
    marginLeft: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  toolbar: {
    padding: 0,
  },
}))

const Navbar = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const userLogout = () => {
    dispatch(userLogoutAction())
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography
              variant='h6'
              color='secondary'
              className={classes.title}
            >
              <Link to='/' className={classes.link}>
                e-dukan
              </Link>
            </Typography>
            <Link to='/cart' className={classes.link}>
              <Button
                color='secondary'
                variant='outlined'
                className={classes.btns}
                startIcon={<ShoppingCartIcon />}
              >
                CART
              </Button>
            </Link>
            {!userInfo && (
              <Link to='/signin' className={classes.link}>
                <Button
                  color='secondary'
                  variant='contained'
                  className={classes.btns}
                  startIcon={<ExitToAppIcon />}
                >
                  SIGN IN
                </Button>
              </Link>
            )}
            {userInfo && (
              <React.Fragment>
                {/* aria-controls='simple-menu' */}
                <Button
                  className={classes.btns}
                  aria-haspopup='true'
                  onClick={handleClick}
                  endIcon={
                    <ArrowDropDownIcon
                      color='secondary'
                      style={{ fontSize: '26px' }}
                    />
                  }
                >
                  <Typography variant='button' color='secondary'>
                    {userInfo.name}
                  </Typography>
                </Button>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to='/profile' className={classes.link}>
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={userLogout}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar
