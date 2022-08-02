import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "src/utils/GeneralFunctions";
import { getPartnerByUserID } from "src/store/slices/Admin/university/unversitySlice";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";
import { ListDemand } from "./ListDemand";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";
import Statistic from "src/components/Statistic";
import { useNavigate } from "react-router-dom";

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

const PartnerPostList = (props) => {
  TabTitle("Danh sách bài đăng | IT Internship JOBS");
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.university);
  const handleChange = (event, newValue) => setValue(newValue);
  const { demandListUniversity } = useSelector((state) => state.demand);
  const userPresent = JSON.parse(localStorage.getItem("userPresent"));
  console.log(demandListUniversity.contents);
  // console.log(activeUser?.universityDTO?.id);


  useEffect(() => {
    dispatch(getPartnerByUserID(userPresent.idUser));
    dispatch(getDemandListByUniId(activeUser?.universityDTO?.id));
  }, [activeUser?.universityDTO?.id]);

  return (
    <div className="hr-post__wrapper">
      <div className="hr-post__list-bt">
        <Button onClick={() => {navigate("/partner/post")}} name="ĐĂNG BÀI"></Button>
      </div>
      <div className="hr-post-list__content">
        <div className="hr-post-list__statistic">
          <Statistic
            title="Điểm khả dụng"
            firstObject={{
              score: demandListUniversity?.contents.length,
              description: "Lượt đăng tuyển",
            }}
            secondObject={{
              score: demandListUniversity?.contents.length,
              description: "Lượt xem hồ sơ",
            }}
          />
          <Statistic
            title="Trạng thái tin đăng"
            firstObject={{
              score: demandListUniversity?.contents.length,
              description: "Đang đăng tuyển",
            }}
            secondObject={{
              score: 0,
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
            <ListDemand demandList={demandListUniversity.contents} text="Không có đợt thực tập đăng tuyển." />
          </TabPanel>
          <TabPanel className="tabPanel" value={value} index={1}>
            <ListDemand demandList={undefined} text="Không có đợt thực tập đã đóng." />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default PartnerPostList;
