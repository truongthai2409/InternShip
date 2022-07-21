import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardJob from 'src/components/CardJob'
import FeedBack from 'src/components/FeedBack'
import UserCard from 'src/components/UserCard'
import { getMarkByUser } from 'src/store/slices/main/mark/markSlice'
import { TabTitle } from 'src/utils/GeneralFunctions'
import './styles.scss'

const CandidateViewList = () => {
  TabTitle('Danh sách ứng viên')
  const dispatch = useDispatch()

  const { careListOfPrivate } = useSelector(state => state.mark)
  const { profile } = useSelector(state => state.authentication)

  useEffect(() => {
    dispatch(getMarkByUser(profile.username))
  }, [dispatch])
  return (
    <div className="view-list">
      <div className="view-list__container">
        <div className="view-list__job-card">
          {careListOfPrivate.map(jobCare => (
            <CardJob key={jobCare.id} jobCare={jobCare} />
          ))}
        </div>
        <div className="view-list__job-user-card">
          <UserCard />
          <FeedBack />
        </div>
      </div>
    </div>
  )
}

export default CandidateViewList
