import { Pagination, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowButton from "src/components/ArrowButton";
import CardJob from "src/components/CardJob";
import FeedBack from "src/components/FeedBack";
import SearchResultHome from "src/components/SearchResultHome";
import UserCard from "src/components/UserCard";
import {
  getApplyListByIdCandidate,
  getJobCandidateAppliedByNameAndLocation
} from "src/store/slices/main/candidate/apply/applySlice";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import {
  getJobCandidateCaredByNameAndLocation,
  getMarkByUser
} from "src/store/slices/main/mark/markSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";

const limit = process.env.LIMIT_OF_PAGE || 5;

const CandidateViewList = () => {
  TabTitle("Danh sách ứng viên");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [emptyList, setEmpList] = useState("");
  // const jobCare = {};
  let { careListOfPrivate, careListOfPrivateHavePages } = useSelector(
    (state) => state.mark
  );
  let { applyList, applyListHavePage } = useSelector((state) => state.apply);
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  
  const eleDuplicate = [];
  for (let i = 0; i < careListOfPrivate?.length; i++) {
    for (let j = 0; j < careListOfPrivate?.length; j++) {
      if (careListOfPrivate[i] === careListOfPrivate[j]) {
        eleDuplicate.push(careListOfPrivate[i]);
      }
    }
  }
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

      if (
        pathUrl === "/candidate/view-list-care" &&
        careListOfPrivate?.length === 0
      ) {
        setEmpList();
        // "Bạn chưa có công việc nào được thêm vào danh sách quan tâm"
      }

      if (
        pathUrl === "/candidate/view-list-apply" &&
        careListOfPrivate?.length === 0
      ) {
        // setEmpList("Bạn chưa ứng tuyển công việc nào");
      }
    };
    _getValue();
  }, [candidateInfoByUsername.id]);

  useEffect(() => {}, []);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearch = async (value) => {
    await dispatch(getCandidateByUserName(profile.username));
    dispatch(getApplyListByIdCandidate(candidateInfoByUsername.id));
    const dataSearch = {
      idCandidate: candidateInfoByUsername?.id,
      valueSearch: {
        name: value || "",
        // province: locationValue,
        no: 0,
        limit: limit,
      },
    };
    if (pathUrl === "/candidate/view-list-care") {
      dispatch(getJobCandidateCaredByNameAndLocation(dataSearch));
    }

    if (pathUrl === "/candidate/view-list-apply") {
      dispatch(getJobCandidateAppliedByNameAndLocation(dataSearch));
    }
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  const handlePagination = (page) => {
    // console.log(typeof page);
    setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };

  useEffect(() => {
    setTotalPage(
      careListOfPrivateHavePages?.totalPages || applyListHavePage?.totalPages
    );
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <div className="view-list">
        <div className="grid_container">
            <div className="candidate_job">
              <div className="view-list__job-card">
                {pathUrl === "/candidate/view-list-care" &&
                careListOfPrivate?.length > 0
                  ? careListOfPrivate.map((jobCare) => (
                      <CardJob
                        key={jobCare.id}
                        jobCare={jobCare}
                        eleDuplicate={eleDuplicate}
                      />
                    ))
                  :
                    ""}

                {pathUrl === "/candidate/view-list-apply" &&
                  applyList?.map((jobApplied) => (
                    <CardJob
                      key={jobApplied.id}
                      jobApplied={jobApplied}
                      eleDuplicate={eleDuplicate}
                    />
                  ))}
              </div>
              
              {careListOfPrivateHavePages?.totalPages===0? <p>Không có công việc quan tâm nào</p>: 
              <div
                className="view-list-page"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <Stack spacing={2}>
                  {careListOfPrivateHavePages.totalItems > 3 ?
                  <Pagination
                  page={careListOfPrivateHavePages?.numberOfCurrentPage || 0}
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
                /> : "" }
                </Stack>
                <div className="demand-detail__back" onClick={handleBackClick}>
                  <ArrowButton
                    direction="left"
                    text="Trở lại"
                    fontSize="15px"
                  />
                </div>
              </div>}
            </div>
            <div className="candidate_info">
              <div className="view-list__job-user-card">
                <div className="">
                  <SearchResultHome
                    // bwidth="680px"
                    bheight="60px"
                    bwidthInput="100px"
                    bheightInput
                    mb="0"
                    onChange={getValueLocationAndHandle}
                    onClick={handleSearch}
                  />
                </div>
                <UserCard />
                <FeedBack />
              </div>
            </div>
        </div>
      </div>
    </Box>
  );
};

export default CandidateViewList;
