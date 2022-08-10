import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./styles.scss";
import Button from "../Button";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { Link } from "react-router-dom";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LanguageIcon from "@mui/icons-material/Language";
// import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PropTypes from "prop-types";

const CardVisit = ({ jobDetailById, logo }) => {
  return (
    <div className="scroll scroll__onTablet-hide ">
      <Card className="visit__card visit__card__onTablet">
        <CardContent>
          <img className="visit__card-logo" alt="visit__card-logo" src={logo} />
          <h2 className="visit__card-nameComapy">
            {jobDetailById?.company?.name}
          </h2>
          <Typography
            variant="body2"
            sx={{ ml: 1, mt: 3, mb: 3 }}
            className="visit__card-detail"
          >
            {jobDetailById?.company?.description}
          </Typography>

          <div className="config__info">
            <a
              href={`mailto:${jobDetailById?.company?.email}`}
              className="config__info"
            >
              <LocalPostOfficeIcon className="config__info-icon"></LocalPostOfficeIcon>
              {jobDetailById?.company?.email}
            </a>
          </div>
          <div className="config__info">
            <Link to="/detail_job" className="config__info">
              <PhoneInTalkIcon className="config__info-icon"></PhoneInTalkIcon>
              {jobDetailById?.company?.phone}
            </Link>
          </div>
          <div className="config__info">
            <a href={jobDetailById?.company?.website} className="config__info">
              <LanguageIcon className="config__info-icon"></LanguageIcon>
              {jobDetailById?.company?.website}
            </a>
            {/* <Link to={jobDetailById?.company?.website} className="config__info">
              <LanguageIcon className="config__info-icon"></LanguageIcon>
              {jobDetailById?.company?.website}
            </Link> */}
          </div>
          {/* <div className="config__info">
            <Link to="/detail_job" className="config__info">
              <AddLocationAltIcon className="config__info-icon"></AddLocationAltIcon>
              {jobDetailById?.company.location}
            </Link>
          </div> */}
        </CardContent>
        <CardActions className="config-button">
          <Button name="Về Chúng Tôi"></Button>
        </CardActions>
      </Card>
    </div>
  );
};

CardVisit.propTypes = {
  logo: PropTypes.string.isRequired,
};
export default CardVisit;
