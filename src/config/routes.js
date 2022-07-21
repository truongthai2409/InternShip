import Dashboard from '../pages/Admin/Dashboard'
import User from '../pages/Admin/User'
import University from '../pages/Admin/University'
import Demand from '../pages/Admin/Demand'
import NotFound from '../pages/NotFound'
import CompanyDetail from '../pages/Admin/CompanyDetail'
import UserDetail from '../pages/Admin/UserDetail'
import UniversityDetail from '../pages/Admin/UniversityDetail'
import Home from '../pages/Main/Home'
import CandidateList from '../pages/Main/HR/CandidateList/CandidateList'
import DemandDetail from '../pages/Admin/DemandDetail'
import Major from '../pages/Admin/Major'
import MajorDetail from '../pages/Admin/MajorDetail'
import DetailHome from '../pages/Main/DetailHome'
import HR from '../pages/Main/HR'
import HRPost from '../pages/Main/HR/HRPost'
import HRPostList from '../pages/Main/HR/HRPostList'
import CandidateInfo from 'src/pages/Register/RegisterStep3/CandidateInfo'
import HRInfo from 'src/pages/Register/RegisterStep3/HRInfo'
import PartnerInfo from 'src/pages/Register/RegisterStep3/PartnerInfo'
import CandidateViewList from 'src/pages/Main/Candidate/ViewList'
import CandidateSaveProfile from 'src/pages/Main/Candidate/SaveProfile'
import CandidateInformationCompany from 'src/pages/Main/Candidate/InformationCompany'
import CandidateHome from 'src/pages/Main/Candidate/Home'
import PartnerHome from 'src/pages/Main/Partner/Home'
import Profile from 'src/components/Profile'
import PartnerPost from 'src/pages/Main/Partner/Post'

export const adminRouter = [
  {
    path: '',
    Component: Dashboard
  },
  {
    path: 'user',
    Component: User
  },
  {
    path: 'university',
    Component: University
  },
  {
    path: '/admin/university/:uniId',
    Component: UniversityDetail
  },

  {
    path: '/admin/company/:comid',
    Component: CompanyDetail
  },
  {
    path: 'major',
    Component: Major
  },
  {
    path: '/admin/major/:id',
    Component: MajorDetail
  },
  {
    path: '/admin/user/:username',
    Component: UserDetail
  },
  {
    path: 'demand',
    Component: Demand
  },
  {
    path: 'demand/:demandId',
    Component: DemandDetail
  },
  {
    path: '*',
    Component: NotFound
  }
]

// main router
export const mainRouter = [
  {
    path: '',
    Component: Home
  },
  {
    path: '/detail',
    Component: DetailHome
  }
]

// hr router
export const hrRouter = [
  {
    path: '',
    Component: HR
  },
  {
    path: 'profile',
    Component: Profile
  },
  {
    path: '/hr/post',
    Component: HRPost
  },
  {
    path: 'list',
    Component: HRPostList
  },
  {
    path: '/hr/candidate/list',
    Component: CandidateList
  }
]

// candidate router
export const candidateRouter = [
  {
    path: '/candidate',
    Component: CandidateHome
  },
  {
    path: '/candidate/view-list',
    Component: CandidateViewList
  },
  {
    path: '/candidate/save-profile',
    Component: CandidateSaveProfile
  },
  {
    path: '/candidate/information_company',
    Component: CandidateInformationCompany
  }
]

//partner router
export const partnerRouter = [
  {
    path: '/partner',
    Component: PartnerHome
  },
  {
    path: '/partner/post',
    Component: PartnerPost
  },
  {
    path: '/partner/post-list',
    Component: PartnerHome
  }
]

// register router
export const registerRouter = [
  {
    path: 'candidate',
    Component: CandidateInfo
  },
  {
    path: 'hr',
    Component: HRInfo
  },
  {
    path: 'partner',
    Component: PartnerInfo
  }
]
