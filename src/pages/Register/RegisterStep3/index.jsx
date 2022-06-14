import React from 'react'
import CandidateInfo from "./CandidateInfo/index"
import HRInfo from './HRInfo/index'
import PartnerInfo from './PartnerInfo/index'


export default function RegisterStep3() {
  const roleID = JSON.parse(sessionStorage.getItem("account"))?.role.id

  const roleInfo = [
    {
      id: 3,
      compo: <CandidateInfo/>
    },
    {
      id: 1,
      compo: <HRInfo/>
    },
    {
      id: 4,
      compo: <PartnerInfo/>
    }
  ]

  const renderInfo = (id) => {
    return roleInfo.map((info) => {
      if (info.id === id) {
        return info.compo
      }
    })
  }

  return (
    <>
      {
        renderInfo(roleID)
      }
    </>
      
  )
}
