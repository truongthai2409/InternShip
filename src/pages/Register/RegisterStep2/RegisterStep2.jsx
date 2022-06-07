import React, {useEffect} from 'react'
import { Link, useParams } from "react-router-dom"
import ArrowButton from "../../../components/ArrowButton/ArrowButton"

export default function RegisterStep2(props) {
  let { roleId } = useParams()
  return (
    <div>
    RegisterStep2
    <Link to='/register'>
      <ArrowButton text="Trở lại" direction="left"/>
    </Link>
    </div>
  )
}
