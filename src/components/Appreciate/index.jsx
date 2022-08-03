import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Button from "../Button";
import "./styles.scss";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import {
  getAppreciateByCompany,
  updateAppreciate,
} from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import { toast } from "react-toastify";
import CustomInput from "../CustomInput";
import Textarea from "../Textarea";
import CustomCheckbox from "../CustomCheckbox";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const labels = {
  0.5: "Vô dụng",
  1: "Vô dụng +",
  1.5: "Kém",
  2: "Kém +",
  2.5: "Được",
  3: "Ok +",
  3.5: "Tốt",
  4: "Tốt +",
  4.5: "Xuất sắc",
  5: "Xuất sắc +",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};
const Appreciate = ({ appreciate }) => {
  const value = appreciate.score;
  const nameUser = "Ẩn danh";
  const { profile } = useSelector((state) => state.authentication);

  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const [isCheck, setIsCheck] = useState(false);
  const { register, handleSubmit, setValue, reset, setError } = useForm();

  const { jobDetail } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const idCompany = jobDetail?.hr?.company.id;
  useEffect(() => {
    setValue("title", appreciate.title);
    setValue("avaluate", "abcd");
    setValue("value", value);
    setValue("isCheck", appreciate.hide);
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCheck = (e) => {
    const check = e.target.checked;
    setIsCheck(!check);
  };
  const onSubmit = async (data) => {
    const username = JSON.parse(localStorage.getItem("userPresent"))?.username;
    const avaluateData = {
      comment: data.title,
      score: valueRating,
      company: {
        id: idCompany,
      },
      user: {
        username: username,
      },
      title: data.avaluate,
      hide: isCheck,
    };

    try {
      const res = await dispatch(updateAppreciate(avaluateData));
      await dispatch(getAppreciateByCompany(idCompany));
      console.log(res);
      if (res.payload.status === 200) {
        toast.success("Đã đăng đánh giá", {
          // position: "top-center",
          // autoClose: 3000,
        });
      } else {
        toast.success(
          "Có lỗi hoặc bạn đã từng đăng đánh giá, vui lòng kiểm tra lại",
          {
            // position: "top-center",
            // autoClose: 3000,
          }
        );
      }
    } catch (error) {
      if (error.status === 400) {
        for (const key in error.data) {
          setError(key, {
            type: "server",
            message: error.data[key],
          });
        }
      }
    }

    reset();
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 10,
      }}
    >
      <Stack sx={{}}>
        <Item
          sx={{}}
          className={
            appreciate?.user?.username === profile.username
              ? "appreciate__active"
              : ""
          }
        >
          <div className="appreciate">
            <div>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ fontSize: 16 }}
              >
                {(appreciate.hide === true && nameUser) ||
                  appreciate?.user?.username}
              </Typography>
            </div>
            <div>
              <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                sx={{ fontSize: 24 }}
              />
              <Box sx={{ ml: 2, fontSize: 16, transform: "translate(0,13px)" }}>
                {labels[value]}
              </Box>
            </div>
          </div>
          <Typography
            variant="p"
            component="div"
            sx={{ fontSize: 16, transform: "translate(0,-10px)" }}
          >
            {appreciate.comment}
          </Typography>
          {appreciate?.user?.username === profile.username && (
            <div className="fix_display">
              <Button name="Sửa đánh giá của bạn" onClick={handleOpen} />
            </div>
          )}
        </Item>
        <Modal
          modalTitle="Sửa đánh giá về công ty"
          open={open}
          setOpen={setOpen}
          children={
            <div>
              <CustomInput
                label="Sửa tiêu đề hoặc để trống"
                id="title"
                type="text"
                placeholder="Vd. Rất tuyệt"
                register={register}
                requirementField={false}
                setValue={setValue}
                value="abcde"
                height="50px"
              />
              <Textarea
                label="Sửa đánh giá về công ty"
                id="avaluate"
                placeholder="Nhập vào đây"
                register={register}
                setValue={setValue}
                check={true}
              />
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="size-medium"
                  value={valueRating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  sx={{
                    fontSize: "20px",
                    color: "yellow",
                  }}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {valueRating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : valueRating]}
                  </Box>
                )}
              </Box>
              <div onChange={handleCheck}>
                <CustomCheckbox label="Ẩn danh" />
              </div>
              <Button onClick={handleSubmit(onSubmit)} name="Đăng đánh giá" />
            </div>
          }
          name="list-candidate"
        />
      </Stack>
    </Box>
  );
};

Appreciate.propTypes = {};

export default Appreciate;
