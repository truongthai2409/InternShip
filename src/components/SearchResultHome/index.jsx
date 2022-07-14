import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/";
import "./styles.scss";
import SelectAreaHome from "../SelectAreaHome";
import useQuery from "../../hooks/useQuery";

function SearchResultHome({
  onSubmit,
  onClick,
  bwidth,
  bheight,
  bwidthInput,
  bheightInput,
  mb,
}) {
  const [searchValue, setSearchValue] = useState("");
  const query = useQuery();
  useEffect(() => {
    const { q = "" } = query;
    setSearchValue(q);
  }, [query]);

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    onClick && onClick(searchValue);
    // setSearchValue("");
    // const val = event.target.value;
    // dispatch(getJobByName("flutter"));
    // onSubmit && onSubmit(val);
    // onSubmit && onSubmit(searchValue);
    // onClick && onClick(searchValue);
  };
  // console.log(searchValue);
  return (
    <div className="header__with-search onMobile onTablet">
      <form
        className="header__with-search-search "
        style={{
          width: bwidth ? `${bwidth}` : "",
          height: bheight ? `${bheight}` : "",
          marginBottom: mb ? `${mb}` : "",
        }}
      >
        <div className="header__with-search-search-wrap">
          <span className="search__icon">
            <SearchOutlinedIcon />
          </span>
          {/* <IconButton className="search__icon"></IconButton> */}
          <input
            type="text"
            className="header__with-search-search-1"
            required
            id="none"
            placeholder="Tìm Kiếm"
            value={searchValue}
            onChange={onChangeSearch}
            style={{
              width: bwidthInput ? `${bwidthInput}` : "",
              height: bheightInput ? `${bheightInput}` : "",
            }}
          />
        </div>
        <div className="header__with-search-search-select header__with-search-search-select-onMobile">
          <AddLocationIcon />
          <SelectAreaHome />
        </div>
        <div className="header__with-search-button-search" onClick={search}>
          <Button name="Tìm kiếm" bheight="25px" bwidth="121px"></Button>
        </div>
      </form>
    </div>
  );
}

SearchResultHome.propTypes = {};

export default SearchResultHome;
