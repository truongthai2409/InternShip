import "./styles.scss";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { getJobByName } from "src/store/slices/main/home/job/jobSlice";
import { createMark, getMark } from "src/store/slices/main/mark/markSlice";
import { toast } from "react-toastify";
const ButtonMark = (props) => {
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  // get global state from redux store
  const { careListCandidate } = useSelector((state) => state.mark);

  useEffect(() => {
    dispatch(getJobByName(""));
    dispatch(getMark());
  }, [dispatch]);

  const handleClickMarkJob = (e) => {
    e.stopPropagation();
    setMark(!mark);
    const isMark = careListCandidate.find(
      (job) => job.jobCare.id === props.jobId
    );

    if (isMark === undefined) {
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
      setMark(false);
      toast.success("Đã mark");
    } else {
      toast.success("Mỗi candidate chỉ có thể quan tâm đến công việc một lần");
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
      {props.isMark ? (
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
