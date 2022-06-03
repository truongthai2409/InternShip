import React from "react";
import { Grid } from "@mui/material";

import "./styles.scss";
import Search from "../../../components/Search";
import Button from "../../../components/Button";
import Select from "../../../components/Select";

export default function HeaderContainer({
  headerName,
  placeholder,
  onChange,
  selectName,
  selectOptions,
  btnName,
  BtnIcon,
}) {
  return (
    <div className="header-container">
      <Grid container spacing={2}>
        <Grid item xs={12} className="header-container__title">
          <h1>{headerName}</h1>
        </Grid>
        <Grid item md={7}>
          <Search placeholder={placeholder} onChange={onChange} />
        </Grid>
        <Grid item md={5}>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Select selectName={selectName} selectOptions={selectOptions} />
            </Grid>
            <Grid item md={4}>
              <Button name={btnName} IconBtnMui={BtnIcon} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
