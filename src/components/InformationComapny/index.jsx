import React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Rating from "@mui/material/Rating";
import { Icon } from "@mui/material";
import moment from "moment";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import { toast } from "react-toastify";
import { addApply } from "src/store/slices/main/candidate/apply/applySlice";
// const formatSalary = (salary = "") => {
//   return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

const InformationCompany = ({ jobDetail, jobDetailById }) => {
  const { profile } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  const handleAddJob = async (e) => {
    e.stopPropagation();
    const res = await dispatch(getCandidateByUserName(profile.username));
    if (!res.payload.cv) {
      toast.error("Bạn chưa có CV, vui lòng cập nhật");
    } else {
      const applyData = {
        apply: JSON.stringify({
          jobApp: {
            id: jobDetail.id,
          },
          candidate: {
            id: res.payload.id,
          },
          referenceLetter: `Đơn ứng tuyển ${profile.username}`,
        }),
        fileCV: res.cv,
      };
      const resApply = await dispatch(addApply(applyData));
      if (resApply.type === "apply_candidate/addApply/fulfilled") {
        toast.success("Đã nộp CV thành công");
      }
    }
  };
  return (
    <div>
      {jobDetail && (
        <>
          <div className="detail__card-3">
            <Typography variant="span">
              <Typography
                variant="span"
                sx={{ fontSize: 18, color: "black", fontWeight: "700" }}
              >
                Mô tả công việc:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontSize: 16, fontWeight: "400" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: jobDetail.desciption }}
                ></div>
              </Typography>
            </Typography>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 18, fontWeight: "700" }}
                >
                  Yêu cầu công việc:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontSize: 16, fontWeight: "400" }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: jobDetail.requirement }}
                  ></div>
                </Typography>
              </Typography>
            </div>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 18, fontWeight: "700" }}
                >
                  Thời hạn ứng tuyển:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontSize: 17, fontWeight: "400" }}
                >
                  {moment(jobDetail.timeStartStr).format("DD/MM/YYYY")} -{" "}
                  {moment(jobDetail.timeEndStr).format("DD/MM/YYYY")}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className="line"></div>
          <div className="detail__card-4">
            {/* <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <CurrencyExchangeIcon />
          </Icon>
          <Typography variant="h6" gutterBottom component="div" >
            {formatSalary(jobDetail.salaryMin)} -{" "}
            {formatSalary(jobDetail.salaryMax)}
          </Typography>
        </div> */}
            <div className="detail__card-4-item" sx={{ display: "flex" }}>
              <Icon className="detail__card-4-item-icon">
                <WorkIcon />
              </Icon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                }}
              >
                {jobDetail.jobType?.name}
              </Typography>
            </div>
            <div className="detail__card-4-item">
              <AddLocationIcon className="detail__card-4-item-icon">
                <WorkIcon />
              </AddLocationIcon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {`${jobDetail.locationjob?.address}, ${jobDetail.locationjob?.district?.name}, ${jobDetail.locationjob?.district?.province?.name}`}
              </Typography>
            </div>
          </div>
          <div className="detail__card-5">
            <Typography variant="span" gutterBottom component="div">
              <Typography variant="button" display="block" gutterBottom>
                {jobDetail.company?.rates?.length}
              </Typography>
              <Rating
                name="read-only"
                precision={0.5}
                readOnly
                defaultValue={jobDetail.company?.rates?.length}
              />
            </Typography>
            <Button
              bwidth="115px"
              bheight="50px"
              name="Ứng tuyển"
              onClick={handleAddJob}
            ></Button>
          </div>
        </>
      )}
      {jobDetailById && (
        <>
          <div className="detail__card-3">
            <Typography variant="span">
              <Typography
                variant="span"
                sx={{ fontSize: 18, color: "black", fontWeight: "700" }}
              >
                Mô tả công việc:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontSize: 16, fontWeight: "400" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetailById.description,
                  }}
                ></div>
              </Typography>
            </Typography>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 18, fontWeight: "700" }}
                >
                  Yêu cầu công việc:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontSize: 16, fontWeight: "400" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobDetailById.requirement,
                    }}
                  ></div>
                </Typography>
              </Typography>
            </div>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 18, fontWeight: "700" }}
                >
                  Thời hạn ứng tuyển:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontSize: 17, fontWeight: "400" }}
                >
                  {moment(jobDetailById.timeStartStr).format("DD/MM/YYYY")} -{" "}
                  {moment(jobDetailById.timeEndStr).format("DD/MM/YYYY")}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className="line"></div>
          <div className="detail__card-4">
            {/* <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <CurrencyExchangeIcon />
          </Icon>
          <Typography variant="h6" gutterBottom component="div" >
            {formatSalary(jobDetailById.salaryMin)} -{" "}
            {formatSalary(jobDetailById.salaryMax)}
          </Typography>
        </div> */}
            <div className="detail__card-4-item" sx={{ display: "flex" }}>
              <Icon className="detail__card-4-item-icon">
                <WorkIcon />
              </Icon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                }}
              >
                {jobDetailById.jobType}
              </Typography>
            </div>
            <div className="detail__card-4-item">
              <AddLocationIcon className="detail__card-4-item-icon">
                <WorkIcon />
              </AddLocationIcon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {`${jobDetailById.locationjob}`}
              </Typography>
            </div>
          </div>
          <div className="detail__card-5">
            <Typography variant="span" gutterBottom component="div">
              <Typography variant="button" display="block" gutterBottom>
                {jobDetailById.company?.rates?.length}
              </Typography>
              <Rating
                name="read-only"
                precision={0.5}
                readOnly
                defaultValue={jobDetailById.company?.rates?.length}
              />
            </Typography>
            <Button
              bwidth="115px"
              bheight="50px"
              name="Ứng tuyển"
              onClick={handleAddJob}
            ></Button>
          </div>
        </>
      )}
    </div>
  );
};

InformationCompany.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InformationCompany;
