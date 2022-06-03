import React from "react";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./styles.scss";

const Search = ({ placeholder, onChange }) => {
  return (
    <div className="search">
      <input
        className="search__input"
        type="search"
        placeholder={`${placeholder}...`}
        onChange={onChange}
      />
      <IconButton>
        <SearchOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default Search;
