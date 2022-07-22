import React from 'react'
import { TabTitle } from 'src/utils/GeneralFunctions'
import Home from '../../Home'
import './styles.scss'

const PartnerHome = () => {
  TabTitle('IT Internship JOBS')
  return (
    <div>
      <Home candidate={true}></Home>
    </div>
  )
}

export default PartnerHome
