import { Link } from '@mui/material';
import React from 'react'
// import PropTypes from 'prop-types'
import Button from '../Button'
import Logo from '../Logo';
import "./styles.scss";

function Header(props) {
  return (
    <div className="container">
      <Logo/>
      <div className="login__home">
        <Link to="/login" className="login">Đăng nhập</Link>
        <Button name="Đăng ký" />
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
