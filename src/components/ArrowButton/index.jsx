import React from 'react'
import './styles.scss'

export default function ArrowButton({ text, direction }) {
  return (
    <button className="arrow-button">
      {direction === 'left' ? (
        <i className="fa-solid fa-arrow-left-long"></i>
      ) : (
        ''
      )}
      {text}
      {direction === 'right' ? (
        <i className="fa-solid fa-arrow-right-long"></i>
      ) : (
        ''
      )}
    </button>
  )
}
