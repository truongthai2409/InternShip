import { Grid } from "@mui/material";
import SearchResultHome from "src/components/SearchResultHome";
import DetailCard from "src/components/DetailCard";
import SideBarHomeList from "src/components/SideBarHomeList";
import FilterPanelHome from "src/components/FilterPanelHome";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getJobByName,
//   getJobByNameAndLocation,
//   getJobList,
// } from "src/store/slices/main/home/job/jobSlice";
import { getDemandList } from "src/store/slices/main/home/demand/demandSlice";

const PartnerHomePage = (props) => {
  // const [valueSearch, setValueSearch] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const dispatch = useDispatch();
  // get global state from redux store
  const { demandList, demandDetail, indexPartnerCardActive } = useSelector(
    (state) => state.demand
  );
  // console.log(demandDetail, indexPartnerCardActive);


  useEffect(() => {
    // console.log(demandList);
    dispatch(getDemandList());
  }, [demandList.length]);

  // const handleSearch = (value) => {
  //   setValueSearch(value);
  //   const dataSearch = {
  //     jobName: valueSearch,
  //     location: locationValue,
  //   };
  //   if (valueSearch && value) {
  //     dispatch(getJobByNameAndLocation(dataSearch));
  //     // } else if (valueSearch && value === "") {
  //     //   dispatch(getJobByNameAndLocation(valueSearch, ""));
  //     // } else if (valueSearch === "" && value) {
  //     //   dispatch(getJobByNameAndLocation("", value));
  //     // } else {
  //     //   dispatch(getJobByNameAndLocation("", ""));
  //   }
  // };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  return (
    <>
      {demandDetail && (
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: "18px" }}
          container
        >
          <Grid item lg={2} md={3} sm={4} xs={12}>
            <SideBarHomeList />
          </Grid>
          <Grid item lg={4} md={8} sm={8} xs={12}>
            <div className="onDesktop">
              <SearchResultHome onChange={getValueLocationAndHandle} />
            </div>

            <FilterPanelHome
              jobList={demandList}
              indexCardActive={indexPartnerCardActive}
            />
          </Grid>
          <Grid item lg={6} className="onTablet">
            <div className="containerDetailCard containerDetailCard-none">
              <div className="none__res">
                <SearchResultHome onChange={getValueLocationAndHandle} />
              </div>
              {demandList ? (
                <DetailCard
                  logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                  jobListName={demandList}
                  jobDetail={demandDetail}
                  demandPartner={true}
                />
              ) : (
                <div>Nothing here</div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PartnerHomePage;
