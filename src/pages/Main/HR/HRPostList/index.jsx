import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobListByUserId,
} from "../../../../store/slices/main/home/job/jobSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { ListJobActive } from "./ListJobActived";
import { ListJobDisabled } from "./ListJobDisabled";
import { Tab, Tabs } from "@mui/material";
import Statistic from "src/components/Statistic";

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
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
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

const HRPostList = (props) => {
  TabTitle("Công việc đang tuyển | IT Internship JOBS");
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const dispatch = useDispatch();
  const { jobList, jobDetail } = useSelector((state) => state.job);
  const userPresent = JSON.parse(localStorage.getItem("userPresent"));

  useEffect(() => {
    dispatch(getJobListByUserId(userPresent.idUser));
    // if (status === "success") dispatch(updateStatusAddJob("fail"));
  }, [jobDetail]);

  const listJobActived = jobList.filter((job) => {
    return job.status.id === 1;
  });
  const listJobDisabled = jobList.filter((job) => {
    return job.status.id === 4;
  });

  return (
    <div className="hr-post__wrapper">
      <div className="hr-post__list-bt">
        <Button name="ĐĂNG BÀI"></Button>
      </div>
      <div className="hr-post-list__content">
        <div className="hr-post-list__statistic">
          <Statistic
            title="Điểm khả dụng"
            firstObject={{
              score: listJobActived.length,
              description: "Lượt đăng tuyển",
            }}
            secondObject={{
              score: listJobActived.length,
              description: "Lượt xem hồ sơ",
            }}
          />
          <Statistic
            title="Trạng thái tin đăng"
            firstObject={{
              score: listJobActived.length,
              description: "Đang đăng tuyển",
            }}
            secondObject={{
              score: listJobDisabled.length,
              description: "Đã đóng",
            }}
          />
        </div>
        <Box className="filter-panel-home__wrapper" sx={{}}>
          <Box className="filter-panel-home__filterPanel" sx={{}}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Đang đăng tuyển" {...a11yProps(0)} />
              <Tab label="Đã đóng" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel className="tabPanel" value={value} index={0}>
            <ListJobActive listJob={listJobActived} />
          </TabPanel>
          <TabPanel className="tabPanel" value={value} index={1}>
            <ListJobDisabled listJob={listJobDisabled} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default HRPostList;
