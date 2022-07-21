import React from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import Button from '../Button'
import Logo from '../Logo'
import SearchResultHome from '../SearchResultHome'
import './styles.scss'

function Header(props) {
  return (
    <div className="container onMobile config">
      <Logo id={props.id} />
      <div className="login__home">
        <Link to="/login" className="login">
          <h5>Đăng Nhập</h5>
        </Link>
        <Link to="/register">
          <Button name="Đăng Ký" />
        </Link>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
