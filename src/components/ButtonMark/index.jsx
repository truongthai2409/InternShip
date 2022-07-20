import "./styles.scss";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { getJobByName } from "src/store/slices/main/home/job/jobSlice";
import {
  createMark,
  deleteMark,
  getMark,
} from "src/store/slices/main/mark/markSlice";
import { toast } from "react-toastify";
const ButtonMark = (props) => {
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  // get global state from redux store
  const { careListCandidate } = useSelector((state) => state.mark);
  useEffect(() => {
    dispatch(getJobByName(""));
    dispatch(getMark());
  }, []);

  const handleClickMarkJob = async (e) => {
    e.stopPropagation();
    // const isMark = careListCandidate.includes(
    //   (job) => job.jobCare.id === props.jobId
    // );

    if (props.isMark === false) {
      const dataCareList = {
        candidateCare: {
          id: 1,
        },
        jobCare: {
          id: props.jobId,
        },
        note: "Đây là công việc ưa thích của mình",
      };
      dispatch(createMark(dataCareList));
      toast.success("Đã mark thành công");
    } else {
      dispatch(deleteMark(props.jobId));
      toast.success("Đã xóa mark thành công");
      // setMark(!mark);
    }
    console.log(careListCandidate);
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
      {props.isMark === true ? (
        <BookmarkBorderIcon style={{ fontSize: `${props.fontSize}` }} />
      ) : (
        <BookmarkIcon
          className="buttonMark__isChecking"
          style={{ fontSize: `${props.fontSize}` }}
        />
      )}
    </IconButton>
  );
};

export default ButtonMark;
