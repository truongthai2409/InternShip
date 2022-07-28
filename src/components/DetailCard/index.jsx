import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TagName from "../TagName";
import {
  // useSelector,
  useDispatch,
} from "react-redux";
import { getJobList } from "../../store/slices/main/home/job/jobSlice";
// import moment from "moment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./styles.scss";
import InformationCompany from "../InformationComapny";
import BaseInformationCompany from "../BaseInformationCompany";
import InformationUniversity from "../InformationUniversity";

export function TabPanel(props) {
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
        <Box sx={{ p: 2 }}>
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

const DetailCard = ({
  logo,
  jobDetail,
  jobListName,
  candidate,
  jobPostHR,
  demandPartner = false,
}) => {
  console.log(jobDetail);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [jobType, setJobType] = useState({});
  const [jobPosition, setJobPosition] = useState({});
  const [major, setMajor] = useState({});

  useEffect(() => {
    if (jobDetail) {
      setJobType(jobDetail?.jobType);
      setJobPosition(jobDetail?.jobposition);
      setMajor(jobDetail.major);
    }
  }, [jobDetail]);

  useEffect(() => {
    dispatch(getJobList());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {jobListName && jobListName.length > 0 ? (
        <div className="detail__card detail__card-ontablet containerDetailCard-home">
          <div className="detail__card-1">
            <div className="detail__card-intro">
              <img
                className="detail__card__logo"
                alt="detail-card-logo"
                src={jobDetail.hr?.company.logo || "https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7901.jpg?w=2000"}
              />
              <div>
                <h2>{jobDetail?.name}</h2>
                <p className="name-company">
                  {jobDetail.hr?.company?.name ||
                    jobDetail?.universityDTO?.name}
                </p>
              </div>
            </div>
            <div className="detail__card-2">
              <div className="tag-name">
                <div className="tag-name__name">
                  <TagName title={jobType?.name || "fulltime"} />
                  <TagName
                    title={jobPosition?.name || jobDetail?.position?.name}
                  />
                  <TagName title={major?.name || "Công nghệ thông tin"} />
                </div>
              </div>
            </div>
          </div>
          <div>
            {!demandPartner ? (
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mt: 1,
                    fontSize: 3,
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="primary"
                    scrollButtons
                  >
                    <Tab
                      label="Chi tiết"
                      {...a11yProps(0)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                    <Tab
                      label="Tổng quan công ty"
                      {...a11yProps(1)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <InformationCompany
                    jobDetail={jobDetail}
                  ></InformationCompany>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BaseInformationCompany jobDetail={jobDetail} />
                </TabPanel>
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mt: 1,
                    fontSize: 3,
                  }}
                >
                </Box>
                <TabPanel value={value} index={0}>
                  <InformationUniversity
                    jobDetail={jobDetail}
                  ></InformationUniversity>
                </TabPanel>
              </Box>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

DetailCard.propTypes = {
  logo: PropTypes.string.isRequired,
  nameMajor: PropTypes.string,
  nameCompany: PropTypes.string,
  detailJob: PropTypes.string,
  requireJob: PropTypes.string,
  timeJob: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DetailCard;
