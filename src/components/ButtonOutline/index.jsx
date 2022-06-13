import React from 'react'
import './styles.scss'

export default function ButtonOutline({name, bwidth}) {
  return (
    <button className="btn-outline" style={{width: bwidth ? bwidth : ""}}>
        {name}
    </button>
  )
}
