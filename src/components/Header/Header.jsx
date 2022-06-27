import { Link } from '@mui/material';
import React from 'react'
// import PropTypes from 'prop-types'
import Button from '../Button'
import "./styles.scss";

function Header(props) {
  return (
    <div className="container">
      <a href="/" className="logo__home">ITIntershipJob</a>
      <div className="login__home">
        <a href="/login" className="login">Đăng nhập</a>
        <Button name="Đăng ký" />
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
