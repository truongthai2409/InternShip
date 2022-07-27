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
      
    </div>
  );
};

export default PartnerPostList;
