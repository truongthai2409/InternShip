import React, { Fragment } from 'react'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const UnAuthenticatedGuard = ({ children }) => {
  const authenticated = useAuthenticated()

  if (authenticated) {
    return <Navigate to="/candidate" />
  }

  return <Fragment>{children}</Fragment>
}
UnAuthenticatedGuard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default UnAuthenticatedGuard
