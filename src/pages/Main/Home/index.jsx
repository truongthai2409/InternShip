import { Grid } from '@mui/material'
import SearchResultHome from '../../../components/SearchResultHome'
import DetailCard from '../../../components/DetailCard'
import SideBarHomeList from '../../../components/SideBarHomeList'
import FilterPanelHome from '../../../components/FilterPanelHome'
import './styles.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getJobByName,
  getJobByNameAndLocation,
  getJobList
} from '../../../store/slices/main/home/job/jobSlice'

const Home = props => {
  const [valueSearch, setValueSearch] = useState('')
  const [locationValue, setLocationValue] = useState('')

  const dispatch = useDispatch()
  // get global state from redux store
  const { jobListName, jobDetail, indexCardActive } = useSelector(
    state => state.job
  )
console.log(jobListName)
  useEffect(() => {
    dispatch(getJobByName(''))
    dispatch(getJobList([1,10]))
  }, [dispatch])

  const handleSearch = value => {
    setValueSearch(value)
    const dataSearch = {
      jobName: valueSearch,
      location: locationValue
    }
    if (valueSearch && value) {
      dispatch(getJobByNameAndLocation(dataSearch))
      // } else if (valueSearch && value === "") {
      //   dispatch(getJobByNameAndLocation(valueSearch, ""));
      // } else if (valueSearch === "" && value) {
      //   dispatch(getJobByNameAndLocation("", value));
      // } else {
      //   dispatch(getJobByNameAndLocation("", ""));
    }
  }

  const getValueLocationAndHandle = value => {
    setLocationValue(value)
  }

  return (
    <>
      {jobDetail && (
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: '18px' }}
          container
        >
          <Grid item lg={2} md={3} sm={4} xs={12}>
            <SideBarHomeList />
          </Grid>
          <Grid item lg={4} md={8} sm={8} xs={12}>
            <div className="onDesktop">
              <SearchResultHome
                onClick={handleSearch}
                onChange={getValueLocationAndHandle}
              />
            </div>

            <FilterPanelHome
              jobList={jobListName.contents}
              indexCardActive={indexCardActive}
            />
          </Grid>
          <Grid item lg={6} className="onTablet">
            <div className="containerDetailCard containerDetailCard-none">
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
              <DetailCard
                logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                jobDetail={jobDetail}
                jobListName={jobListName.contents}
                candidate={props.candidate}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Home
