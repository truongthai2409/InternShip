import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { activePage1 } from 'src/store/slices/main/home/global/globalSlices'
import { TabTitle } from 'src/utils/GeneralFunctions'
import PostJobForm from '../../../../containers/Home/PostJobForm'

const HRPost = () => {
  TabTitle('Đăng tuyển | IT Internship JOBS')
  return <PostJobForm formStatus = "post" />
}

export default HRPost
