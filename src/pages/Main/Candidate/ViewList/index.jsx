import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardJob from "src/components/CardJob";
import FeedBack from "src/components/FeedBack";
import UserCard from "src/components/UserCard";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";
import Box from "@mui/material/Box";
import { getApplyListByIdCandidate } from "src/store/slices/main/candidate/apply/applySlice";
import SearchResultHome from "src/components/SearchResultHome";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowButton from "src/components/ArrowButton";
import { getJobByNameAndLocation } from "src/store/slices/main/home/job/jobSlice";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";

const CandidateViewList = () => {
  TabTitle("Danh sách ứng viên");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const [locationValue, setLocationValue] = useState("");
  let { careListOfPrivate } = useSelector((state) => state.mark);
  let { jobListName } = useSelector((state) => state.job);
  const { applyList } = useSelector((state) => state.apply);
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  const eleDuplicate = [];
  for (let i = 0; i < careListOfPrivate.length; i++) {
    for (let j = 0; j < careListOfPrivate.length; j++) {
      if (careListOfPrivate[i] === careListOfPrivate[j]) {
        eleDuplicate.push(careListOfPrivate[i]);
      }
    }
  }
  const { profile } = useSelector((state) => state.authentication);
  // const [value, setValue] = React.useState(0);
  useEffect(() => {
    const getValue = async () => {
      await dispatch(getMarkByUser(profile.username));
      await dispatch(getCandidateByUserName(profile.username));
      await dispatch(getApplyListByIdCandidate(candidateInfoByUsername.id));
      if (
        pathUrl === "/candidate/view-list-care" &&
        careListOfPrivate &&
        careListOfPrivate.length === 0
      ) {
        toast.success(
          "Bạn chưa có công việc nào được thêm vào danh sách quan tâm"
        );
      }

      if (
        pathUrl === "/candidate/view-list-apply" &&
        careListOfPrivate &&
        careListOfPrivate.length === 0
      ) {
        toast.success("Bạn chưa ứng tuyển công việc nào");
      }
    };
    getValue();
  }, []);

  useEffect(() => {}, []);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearch = async (value) => {
    const dataSearch = {
      name: value || "",
      province: locationValue || "",
      no: 0,
      limit: 10,
    };
    await dispatch(getJobByNameAndLocation(dataSearch));

    // navigate(
    //   `/candidate` +
    //     `?name=${value || ""}&province=${
    //       encodeURIComponent(locationValue)
    //         .replace(/%20/g, "+")
    //         .replace(/\s/g, "-") || ""
    //     }&no=0&limit=10`
    // );
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <div className="view-list">
        <div className="view-list__container">
          <div className="view-list__job-card">
            {pathUrl === "/candidate/view-list-care" &&
              careListOfPrivate?.map((jobCare) => (
                <CardJob
                  key={jobCare.id}
                  jobCare={jobCare}
                  eleDuplicate={eleDuplicate}
                />
              ))}
            {pathUrl === "/candidate/view-list-apply" &&
              applyList?.map((jobApplied) => (
                <CardJob
                  key={jobApplied.id}
                  jobApplied={jobApplied}
                  eleDuplicate={eleDuplicate}
                />
              ))}
          </div>

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
        <div className="demand-detail__back" onClick={handleBackClick}>
          <ArrowButton direction="left" text="Trở lại" />
        </div>
      </div>
    </Box>
  );
};

export default CandidateViewList;
