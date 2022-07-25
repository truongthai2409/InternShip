import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardJob from "src/components/CardJob";
import FeedBack from "src/components/FeedBack";
import UserCard from "src/components/UserCard";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getApplyListByIdCandidate } from "src/store/slices/main/candidate/apply/applySlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CandidateViewList = () => {
  TabTitle("Danh sách ứng viên");
  const dispatch = useDispatch();

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
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Danh sách công việc đã lưu"
            {...a11yProps(0)}
            sx={{ fontSize: 13 }}
          />
          <Tab
            label="Danh sách công việc đã ứng tuyển"
            {...a11yProps(1)}
            sx={{ fontSize: 13 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="view-list">
          <div className="view-list__container">
            <div className="view-list__job-card">
              {careListOfPrivate?.map((jobCare) => (
                <CardJob key={jobCare.id} jobCare={jobCare} />
              ))}
            </div>
            <div className="view-list__job-user-card">
              <UserCard />
              <FeedBack />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="view-list">
          <div className="view-list__container">
            <div className="view-list__job-card">
              {applyList.map((jobCare) => (
                <CardJob key={jobCare.id} jobCare={jobCare} />
              ))}
            </div>
            <div className="view-list__job-user-card">
              <UserCard />
              <FeedBack />
            </div>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
};

export default CandidateViewList;
