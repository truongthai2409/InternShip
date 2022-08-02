import "./styles.scss";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { getJobByName } from "src/store/slices/main/home/job/jobSlice";
import {
  createMark,
  deleteMark,
  getMarkByUser,
  getMarkByUserAndJob,
} from "src/store/slices/main/mark/markSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
const ButtonMark = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  // get global state from redux store
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  const { profile } = useSelector((state) => state.authentication);
  useEffect(() => {
    profile?.username && dispatch(getCandidateByUserName(profile.username));
  }, [dispatch, profile.username]);

  const handleClickMarkJob = async (e) => {
    e.stopPropagation();

    if (props.isMark === false) {
      const dataCareList = {
        candidateCare: {
          id: candidateInfoByUsername.id,
        },
        jobCare: {
          id: props.jobId,
        },
        note: "Đây là công việc ưa thích của mình",
      };
      await dispatch(createMark(dataCareList));
      await dispatch(getMarkByUser(profile.username));
      setMark(!mark);
      toast.success("Đã mark thành công");
    } else {
      if (profile.role !== undefined && profile.role === "Role_Candidate") {
        const dataByUserAndJob = {
          userName: profile.username,
          idJob: Number(props.jobId),
        };
        const res = await dispatch(getMarkByUserAndJob(dataByUserAndJob));
        await dispatch(deleteMark(res.payload.id));
        await dispatch(getMarkByUser(profile.username));
        setMark(false);
        toast.success("Đã xóa mark thành công");
      }
    }
  };

  const handleLogin = async (e) => {
    e.stopPropagation();
    if (profile.username === undefined) {
      toast.error("Bạn cần đăng nhập với candidate để đánh dấu công việc");
      await navigate("/login");
    } else {
      await navigate("/candidate");
    }
  };
  return (
    <IconButton
      style={{
        border: "1px solid #F1F1F1",
        borderRadius: "4px",
        width: `${props.width}`,
        height: `${props.height}`,
      }}
      aria-label="mark"
      className="buttonMark__wrapper"
      onClick={handleClickMarkJob}
    >
      {pathUrl === "/candidate" ? (
        props.isMark === false && mark === false ? (
          <BookmarkBorderIcon style={{ fontSize: `${props.fontSize}` }} />
        ) : (
          <BookmarkIcon
            className="buttonMark__isChecking"
            style={{ fontSize: `${props.fontSize}` }}
          />
        )
      ) : (
        <BookmarkBorderIcon
          style={{ fontSize: `${props.fontSize}` }}
          onClick={handleLogin}
        />
      )}
    </IconButton>
  );
};

export default ButtonMark;
