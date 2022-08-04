import "./styles.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import PostStatus from "../PostStatus";
import ButtonAction from "../ButtonAction";
import moment from "moment";
import { useRef, useState } from "react";
import Modal from "../Modal";
import CandidateList from "src/pages/Main/HR/CandidateList";
import PostJobForm from "src/containers/Home/PostJobForm";
import Confirmation from "../Confirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  disableJob,
  getJobById,
} from "src/store/slices/main/home/job/jobSlice";

const CardPost = (props) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(<CandidateList />);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { jobListActived, jobDetailById } = useSelector((state) => state.job);
  const callJob = useRef(0);

  const visiting = () => {
    if (callJob.current === 1) {
      return;
    }
    callJob.current++;
    dispatch(getJobById(props.idJob));
  };
  const leaving = () => {
    if (callJob.current === 0) {
      return
    }
    callJob.current--;
  };

  const handleCloseJob = () => {
    const jobDetail = jobListActived.filter((job) => {
      return job.id === props.idJob;
    });
    const jobData = {
      name: jobDetail[0]?.name,
      desciption: jobDetail[0]?.desciption,
      amount: jobDetail[0]?.amount,
      otherInfo: jobDetail[0]?.otherInfo,
      salaryMin: jobDetail[0]?.salaryMin,
      salaryMax: jobDetail[0]?.salaryMax,
      requirement: jobDetail[0]?.requirement,
      timeStartStr: jobDetail[0]?.timeStartStr,
      timeEndStr: jobDetail[0]?.timeEndStr,
      hr: {
        id: jobDetail[0]?.hr?.id,
      },
      jobType: {
        id: jobDetail[0]?.jobType?.id,
      },
      major: {
        id: jobDetail[0]?.major?.id,
      },
      jobposition: {
        id: jobDetail[0]?.jobposition?.id,
      },
      locationjob: {
        id: jobDetail[0]?.locationjob?.id,
        address: jobDetail[0]?.locationjob?.address,
        district: {
          id: jobDetail[0]?.locationjob?.district?.id,
          province: {
            id: jobDetail[0]?.locationjob?.district?.province?.id,
            countries: {
              id: jobDetail[0]?.locationjob?.district?.province?.countries?.id,
            },
          },
        },
      },
      status: {
        id: 4,
      },
    };
    dispatch(disableJob([props.idJob, jobData]));

    setOpen(false);
  };

  const handleOnClick = (e) => {
    let arrayString = e.target.textContent.split(` `);
    let type =
      arrayString[arrayString.length - 2] +
      " " +
      arrayString[arrayString.length - 1];

    switch (type) {
      case "Chỉnh sửa":
        setComponent(
          <PostJobForm
            isUpdate={true}
            jobDetail={jobDetailById}
            idJob={props.idJob}
          />
        );
        setTitle("Chỉnh sửa công việc");
        break;
      case "Đóng việc":
        setTitle("Đóng việc");
        setComponent(
          <Confirmation
            func={handleCloseJob}
            setOpen={setOpen}
            text="Bạn có chắc muốn đóng việc?"
            nameBtnYes="Đóng việc"
            nameBtnNo="Hủy"
          />
        );
        break;
      default:
        setTitle("Danh sách ứng viên đã ứng tuyển");
        setComponent(<CandidateList />);
    }
    setOpen(true);
  };
  return (
    <div
      onMouseMove={visiting}
      onMouseLeave={leaving}
      className="card-post__container"
    >
      <PostStatus status={props.status?.id} />
      <h3 className="card-post__job-name">{props.jobName}</h3>
      <div className="card-post__company-info-detail">
        <img
          className="company-info-detail__img"
          src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
          alt="Ảnh của công ty"
        />
        <div className="company-info-detail__content">
          <p className="company__name">{props.companyName}</p>
          <p className="company__location">{props.companyLocation}</p>
        </div>
      </div>
      <p className="card-post__amount">Số lượng: {props.amount}</p>
      <p className="card-post__time">
        <b>Thời gian tuyển dụng:</b>{" "}
        {moment(props.timeStart).format("DD/MM/YYYY")} -{" "}
        {moment(props.timeEnd).format("DD/MM/YYYY")}
      </p>
      <p className="card-post__created">
        <b>Ngày đăng:</b> {moment(props.timeCreated).format("DD/MM/YYYY")}
      </p>
      <div className="card-post__action">
        <ButtonAction
          onClick={handleOnClick}
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<PersonOutlineIcon></PersonOutlineIcon>}
          color="#111"
          name="Ứng viên"
          fontSize="13px"
          type="read"
        />
        <ButtonAction
          onClick={handleOnClick}
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<ModeEditOutlineIcon></ModeEditOutlineIcon>}
          color="#111"
          name="Chỉnh sửa"
          fontSize="13px"
          type="update"
        />
        <ButtonAction
          onClick={handleOnClick}
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<DoorFrontIcon></DoorFrontIcon>}
          color="#111"
          name="Đóng việc"
          fontSize="13px"
          type="close"
        />
      </div>
      <Modal
        modalTitle={title}
        name="list-candidate"
        open={open}
        setOpen={setOpen}
      >
        {component}
      </Modal>
    </div>
  );
};

export default CardPost;
