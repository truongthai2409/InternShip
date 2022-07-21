import './styles.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import { candidateRouter } from 'src/config/routes'
import { useLocation } from 'react-router-dom'
import HeaderWithHR from 'src/components/HeaderWithHR'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMark } from 'src/store/slices/main/mark/markSlice'

const CandidateLayOut = () => {
  let location = useLocation()
  const dispatch = useDispatch()
  const { careListCandidate } = useSelector(state => state.mark)
  let isMark
  useEffect(() => {
    dispatch(getMark())
  }, [dispatch])

  return (
    <div className="main__layout">
      {location.pathname === '/candidate/information_company' ? (
        <HeaderWithHR id={3} search />
      ) : (
        <HeaderWithHR id={3} isMark={careListCandidate.length > 0} />
      )}
      <Outlet />
      <Footer />
    </div>
  )
}

export default CandidateLayOut
