import React from 'react'
import './button-outline.scss'

export default function ButtonOutline({name, bwidth}) {
  return (
    <button className="btn-outline" style={{width: bwidth ? bwidth : ""}}>
        {name}
    </button>
  )
}
