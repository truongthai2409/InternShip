import { Grid, Tab, Tabs, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import StatisticalBox from "./StatisticalBox";
import Search from "src/components/Search";
import PostCard from "../PostCard";
import { TabPanel } from "src/components/DetailCard";
import { useDispatch, useSelector } from "react-redux";
import { getDemandList } from "src/store/slices/main/home/demand/demandSlice";

const PartnerPostList = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { demandList } = useSelector((state) => state.demandList);
  console.log(demandList);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    dispatch(getDemandList());
  }, [dispatch]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid
        className="wrapper"
        spacing={{ xs: 6 }}
        sx={{ padding: "18px" }}
        container
      >
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <div className="statistical-box__container">
            <Search placeholder="Tìm kiếm" width="100%" />
            <StatisticalBox
              heading="Điểm khả dụng"
              title1="0"
              title2="0"
              content1="Điểm đăng tuyển"
              content2="Điểm xem hồ sơ"
            />

            <StatisticalBox
              heading="Trạng thái tin đăng"
              title1="0"
              title2="0"
              content1="Đang đăng tuyển"
              content2="Đã đóng"
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
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
                  label="Đang đăng tuyển"
                  {...a11yProps(0)}
                  textColor="inherit"
                  sx={{ fontSize: 12 }}
                />
                <Tab
                  label="Đã đóng"
                  {...a11yProps(1)}
                  textColor="inherit"
                  sx={{ fontSize: 12 }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <PostCard
                jobPosition="Backend"
                logo="asd"
                nameSchool="Trường Đại học Bách Khoa"
                address="1164 Phạm Văn Đồng TP Thủ Đức"
                dateStartStr="2022-12-07"
                dateEndStr="2022-12-08"
                candidateAmount={10}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PostCard
                jobPosition="Backend"
                logo="asd"
                nameSchool="Trường Đại học Bách Khoa"
                address="1164 Phạm Văn Đồng TP Thủ Đức"
                dateStartStr="2022-12-07"
                dateEndStr="2022-12-08"
                candidateAmount={10}
              />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default PartnerPostList;
