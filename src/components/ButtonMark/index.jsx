import "./styles.scss";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { getJobByName } from "src/store/slices/main/home/job/jobSlice";
import { addJob, removeJob } from "src/store/slices/main/mark/markSlice";
import { toast } from "react-toastify";
const ButtonMark = (props) => {
  const dispatch = useDispatch();
  const { markJob } = useSelector((state) => state);
  const [jobs, setJobs] = useState([]);
  // get global state from redux store
  const { jobListName } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJobByName(""));
  }, [dispatch]);

  const handleClickMarkJob = (e) => {
    e.stopPropagation();
    setMark(!mark);
    const clickedJobId = e.target
      .closest(".cardHome__container")
      .getAttribute("dataset");

    const clickedJobIndex = jobListName.findIndex(
      (job) => job.id === clickedJobId
    );

    const newJobListName = [...jobListName];
    const isMarked = markJob.find((job) => job.id === clickedJobIndex);
    if (isMarked) {
      newJobListName.splice(clickedJobIndex, 1, {
        ...jobListName[clickedJobIndex],
        mark: false,
      });
      setJobs(newJobListName);
      dispatch(removeJob(jobListName[clickedJobIndex]));
      toast.success("Đã xóa đánh dấu");
    } else {
      newJobListName.splice(clickedJobIndex, 1, {
        ...jobListName[clickedJobIndex],
        mark: true,
      });
      setJobs(newJobListName);
      dispatch(addJob(jobListName[clickedJobIndex]));
      toast.success("Đã thêm đánh dấu");
    }
  };

  const [mark, setMark] = useState(true);

  const handleClick = (e) => {
    e.stopPropagation();
    setMark(!mark);
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
      {mark ? (
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
