import React from 'react'

import './styles.scss'

const Button = ({
  className,
  name,
  IconBtnMui,
  onClick,
  bwidth,
  bheight,
  fz,
  children,
  outline
}) => {
  return (
    <>
      <button
        className={`button ${className ? className : ''}`}
        onClick={onClick}
        style={{
          width: bwidth ? `${bwidth}` : '',
          height: bheight ? `${bheight}` : '',
          fontSize: fz ? fz : '',
          outline: outline ? outline : ''
        }}
        type="submit"
      >
        {IconBtnMui ? <IconBtnMui className="button__icon" /> : null}
        <p>{name}</p>
        {children}
      </button>
    </>
  )
}

export default Button
