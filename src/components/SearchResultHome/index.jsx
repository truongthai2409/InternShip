import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddLocationIcon from "@mui/icons-material/AddLocation";

import "./styles.scss";
import SelectAreaHome from "../SelectAreaHome";
import Button from "../Button";

function SearchResultHome(props) {
  return (
    <div className="header__with-search">
      <div className="header__with-search-search">
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
        <div className="header__with-search-search-select">
          <IconButton className="select__icon-location">
            <AddLocationIcon />
          </IconButton>
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
