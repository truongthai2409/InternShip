import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardHome from "../CardHome";
import {
  getJobByName,
  getJobList,
} from "../../store/slices/main/home/job/jobSlice";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import useQuery from "../../hooks/useQuery";

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

export default function FilterPanelHome() {
  const [value, setValue] = useState(0);
  const [jobLists, setJobList] = useState({
    jobLists: [],
  });
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const query = useQuery();

  // get global state from redux store
  const { jobList, indexCardActive, jobDetail } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    const _filters = {
      ...query,
    };
    setFilters(_filters);
    const params = {
      q: _filters,
    };
    const _getListJob = async () => {
      const data = await dispatch(getJobByName({ params }));
      setJobList(data);
    };
    _getListJob();
  }, [query, dispatch]);

  useEffect(() => {
    dispatch(getJobList(jobDetail));
  }, []);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box className="filter-panel-home__wrapper" sx={{}}>
      <Box className="filter-panel-home__filterPanel" sx={{}}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Mới nhất" {...a11yProps(0)} />
          <Tab label="Đánh giá" {...a11yProps(1)} />
          <Tab label="Liên quan" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel className="tabPanel" value={value} index={0}>
        {jobList.map((job, index) => (
          <CardHome
            id={job.id}
            active={indexCardActive}
            index={index}
            key={job.id}
            title={job.name}
            fontSize={10}
            nameCompany={job.hr.company.name}
            tagName={[job.jobposition.name, "Full time"]}
            start={4.5}
            location="Hồ Chí Minh"
            time={[
              moment(job.timeStartStr).format("DD/MM/YYYY"),
              moment(job.timeEndStr).format("DD/MM/YYYY"),
            ]}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <CardHome /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <CardHome /> */}
      </TabPanel>
    </Box>
  );
}
