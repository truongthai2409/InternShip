import { Pagination, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowButton from "src/components/ArrowButton";
import CardHome from "src/components/CardHome";
import DetailCard from "src/components/DetailCard";
import { TabPanel } from "src/components/DetailCard/component";
import Null from "src/components/Null";
import {
  getApplyListByIdCandidate
} from "src/store/slices/main/candidate/apply/applySlice";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import {
  getMarkByUser
} from "src/store/slices/main/mark/markSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";

const limit = process.env.LIMIT_OF_PAGE || 5;

const CandidateViewList = () => {
  TabTitle("Công việc ứng tuyển");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const [currentPage, setCurrentPage] = useState(0);
  const [indexs, setIndex] = useState(0);
  const [detail, setJobDetails] = useState([])
  const [totalPage, setTotalPage] = useState();


  let { applyList, applyListHavePage } = useSelector((state) => state.apply);
  
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );


  const { profile } = useSelector((state) => state.authentication);
  // const {profile} = useSelector((state)=>state.user)

  useEffect(() => {
    const _getValue = async () => {
      const dataGetMarkByUser = {
        userName: profile.username,
        page: {
          no: currentPage,
          limit: limit,
        },
      };

      await dispatch(getMarkByUser(dataGetMarkByUser));
      await dispatch(getCandidateByUserName(profile.username));

      const dataGetAppliedByCandidate = {
        idCandidate: candidateInfoByUsername.id,
        page: {
          no: currentPage,
          limit: limit,
        },
      };
      await dispatch(getApplyListByIdCandidate(dataGetAppliedByCandidate));

    };
    _getValue();
  }, [candidateInfoByUsername.id]);


  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(()=>{
    setJobDetails(applyList ? applyList[0]?.jobApp : [])
  },[applyList])
  const handlePagination = (page) => {

    setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };
  const handleClick = (job, index) => {
    setJobDetails(job.jobApp)
    setIndex(index)
  }

  return (
    <Box sx={{ width: "100%", minHeight: "47vh" }}>
      <div className="view-list">
        <div className="grid_container">
          <div className="candidate_job">
            <div className="view-list__job-card">
              <TabPanel className="tabPanel" value={0} index={0}>
                {applyList && applyList?.length > 0
                  ? applyList.map((job, index) => (
                    <div style={{ marginTop: -8 }} onClick={() => handleClick(job, index)}>
                      <CardHome
                        hiddent={true}
                        page={index}
                        id={job.jobApp?.id}
                        active={indexs}
                        index={index}
                        key={job.jobApp?.id}
                        title={job.jobApp?.name}
                        fontSize={10}
                        nameCompany={
                          job.jobApp?.hr?.company?.name
                        }
                        idCompany={
                          job.jobApp?.hr?.company?.id
                        }
                        tagName={[
                          job.jobApp?.jobposition?.name
                        ]}
                        location={job.jobApp?.locationjob?.district?.province?.name}
                        amount={job.jobApp?.amount || "Không có"}
                        demandPartner={true}
                        time={[
                          moment(job.jobApp?.timeStartStr || job.jobApp?.createDate).format(
                            "DD/MM/YYYY"
                          ),
                          moment(job.jobApp?.timeEndStr || job.jobApp?.end).format("DD/MM/YYYY"),
                        ]}
                        locationPath={location.pathname}
                      />
                    </div>
                  ))
                  : <div style={{ "textAlignLast": "center" }}>Không tìm thấy công việc</div>}
              </TabPanel>
            </div>
            {applyListHavePage?.totalPages === 0 ? <Null image={"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_21.jpg"} /> :
              <div
                className="view-list-page"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                {/* <Stack spacing={2}>
                  {applyListHavePage.totalItems > 3 ?
                    <Pagination
                      page={applyListHavePage?.numberOfCurrentPage || 0}
                      defaultPage={1}
                      onChange={(e) => handlePagination(e.target.textContent)}
                      count={totalPage || 1}
                      variant="outlined"
                      shape="rounded"
                      size="medium"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        marginLeft: "150px",
                      }}
                    /> : ""}
                </Stack> */}
                <div className="demand-detail__back" onClick={handleBackClick} style={{width:"100%", float: "left"}}>
                  <ArrowButton
                    direction="left"
                    text="Trở lại"
                    fontSize="15px"
                  />
                </div>
              </div>}
          </div>
          <div className="candidate_info">
            <div className="view-list__job-user-card" style={{ marginTop : 10}}>
              <DetailCard
                logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                jobDetail={detail}
                jobList={applyList}
                candidate={true}
                jobListCompany={detail}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CandidateViewList;
