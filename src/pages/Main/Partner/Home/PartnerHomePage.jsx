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
import { getDemandByName, getDemandList } from "src/store/slices/main/home/demand/demandSlice";
import PaginationCustom from 'src/components/'

const limit = 10;

const PartnerHomePage = (props) => {
  // const [valueSearch, setValueSearch] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  // get global state from redux store
  const { demandList, totalPagesofDemandList, demandDetail, indexPartnerCardActive } = useSelector(
    (state) => state.demand
  );

  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: currentPage,
      limit: 4,
    };
    dispatch(getDemandByName(dataSearch));
    // dispatch(getJobList([1, 10]));
  }, [dispatch, currentPage]);
  // console.log(demandDetail, indexPartnerCardActive);
  // console.log(totalPagesofDemandList);

  const handlePaginate = (page) => {
    console.log(page);
    setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };

  useEffect(() => {
    console.log(currentPage);
    dispatch(getDemandList({ currentPage, limit }));
  }, [demandList.length, currentPage]);

  const handleSearch = (value) => {
    const dataSearch = {
      name: value || "",
      no: 0,
      limit: 2,
    };
    dispatch(getDemandByName(dataSearch));
  };

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
              <SearchResultHome 
                onClick={handleSearch} 
                onChange={getValueLocationAndHandle} 
              />
            </div>

            <FilterPanelHome
              jobList={demandList}
              indexCardActive={indexPartnerCardActive}
            />
            <div className="partner-postList__pagination">
              <Pagination
                count={totalPagesofDemandList}
                variant="outlined"
                color="primary"
                onChange={(e) => handlePaginate(e.target.textContent)}
              />
            </div>
          </Grid>
          <Grid item lg={6} className="onTablet">
            <div className="containerDetailCard containerDetailCard-none">
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle} 
                />
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
