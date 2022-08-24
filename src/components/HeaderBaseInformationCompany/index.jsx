import { Box } from "@mui/system";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { Typography } from "@mui/material";
const HeaderBaseInformationCompany = ({ jobDetail }) => {
  return (
    <div>
      <Box
        sx={{
          border: "1px solid #DEDEDE",
        }}
        elevation={0}
        PaperProps={{
          elevation: 0,
        }}
      >
        <div className="base__information-card">
          <div
            style={{
              marginRight: "16px",
            }}
          >
            <Box
              elevation={0}
              sx={{
                width: 135,
                height: 135,
                backgroundColor: "transparent",
                borderRadius: "6px",
                marginRight: "20px",
              }}
            >
              <img
                className="img-logo"
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
              />
            </Box>
          </div>

          <div className="base__information-card-detail">
            <h3 className="company-name">{jobDetail?.hr?.company.name}</h3>

            <div className="">
              <PhoneInTalkIcon
                sx={{
                  fontSize: 18,
                  color: "#04bf8a",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  transform: "translate(5px,0px)",
                }}
              >
                {jobDetail?.hr?.company.phone}
              </Typography>
            </div>
            <div className="fix__margin">
              <h5>
                <EmailIcon
                  sx={{
                    fontSize: 18,
                    color: "#04bf8a",
                  }}
                />
                <a
                  href={`mailto:${jobDetail?.hr?.company.email}`}
                  className=" "
                >
                  {jobDetail?.hr?.company.email}
                </a>
              </h5>
            </div>
            <div className="detail-website">
              <h5 className="">
                <LanguageIcon
                  sx={{
                    fontSize: 18,
                    color: "#04bf8a",
                  }}
                />
                <a href={jobDetail?.hr?.company.website} className=" ">
                  {jobDetail?.hr?.company.website}
                </a>
              </h5>

              <div
                className=" base__information-card-detail-location"
                style={{
                  transform: "translate(0px,5px)",
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: 18,
                    color: "#04bf8a",
                  }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 16,
                    fontWeight: "400",
                    transform: "translate(5px,0px)",
                  }}
                >
                  {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default HeaderBaseInformationCompany;
