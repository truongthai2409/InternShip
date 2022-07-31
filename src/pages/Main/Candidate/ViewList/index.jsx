import React, { useEffect } from "react";
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

const CandidateViewList = () => {
  TabTitle("Danh sách ứng viên");
  const dispatch = useDispatch();
  const location = useLocation();
  const pathUrl = location.pathname;
  const { careListOfPrivate } = useSelector((state) => state.mark);
  const { applyList } = useSelector((state) => state.apply);
  const { profile } = useSelector((state) => state.authentication);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(getMarkByUser(profile.username));
    dispatch(getApplyListByIdCandidate(profile.idUser));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (
    pathUrl === "/candidate/view-list-care" &&
    careListOfPrivate &&
    careListOfPrivate.length === 0
  ) {
    toast.success("Bạn chưa có công việc nào được thêm vào danh sách quan tâm");
  }

  if (
    pathUrl === "/candidate/view-list-apply" &&
    careListOfPrivate &&
    careListOfPrivate.length === 0
  ) {
    toast.success("Bạn chưa ứng tuyển công việc nào");
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mt: 1,
          fontSize: 3,
          display: "flex",
          justifyContent: "center",
        }}
      ></Box>
      {/* <TabPanel value={value} index={0}> */}

      <div className="view-list">
        <div className="view-list__container">
          <div className="view-list__job-card">
            {pathUrl === "/candidate/view-list-care" &&
              careListOfPrivate?.map((jobCare) => (
                <CardJob key={jobCare.id} jobCare={jobCare} />
              ))}
            {pathUrl === "/candidate/view-list-apply" &&
              applyList?.map((jobCare) => (
                <CardJob key={jobCare.id} jobCare={jobCare} />
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
              />
            </div>
            <UserCard />
            <FeedBack />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CandidateViewList;
