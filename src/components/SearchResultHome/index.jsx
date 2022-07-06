import React from "react";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddLocationIcon from "@mui/icons-material/AddLocation";

import Button from "../../components/Button/";
import "./styles.scss";
import SelectAreaHome from "../SelectAreaHome";

function SearchResultHome(props) {
  return (
    <div className="header__with-search onMobile onTablet ">
      <div className="header__with-search-search ">
        <div className="header__with-search-search-wrap">
          <IconButton className="search__icon">
            <SearchOutlinedIcon />
          </IconButton>
          <input
            type="text"
            className="header__with-search-search-1"
            required
            id="none"
            placeholder="Tìm Kiếm"
          />
        </div>
        <div className="header__with-search-search-select header__with-search-search-select-onMobile">
          <AddLocationIcon />
          {/* <CustomSelect></CustomSelect> */}
          <SelectAreaHome />
          {/* <IconButton className="select__icon-arrow-drop">
            <ArrowDropDownIcon />
          </IconButton> */}
        </div>
        <div className="header__with-search-button-search">
          <Button name="Tìm kiếm"></Button>
        </div>
      </div>
    </div>
  );
}

SearchResultHome.propTypes = {};

export default SearchResultHome;
