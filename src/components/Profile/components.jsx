import { yupResolver } from "@hookform/resolvers/yup";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonOutline from "../ButtonOutline";
import InputFile from "../InputFile";
import Modal from "../Modal";
import "./reponsive.scss";
import "./styles.scss";

export const Actions = ({ props }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });
  const [opens, setOpens] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClick = (number) => {
    switch (number) {
      case 1: {
        setOpen(!open);
        break;
      }
      case 2: {
        setOpens(!opens);
        break;
      }
      default:
        break;
    }
  };
  const onSubmit = () => {

  };
  const handleChange = (e) => {

  };

  return (
    <div>
      <div className="profile__actions">
        <Modal
          modalTitle={"Thay đổi CV"}
          open={open}
          setOpen={setOpen}
          children={
            <form
              onChange={handleChange}
              style={{
                width: 300,
                height: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputFile
                label="CV"
                requirementField={false}
                id="avatar"
                format="pdf"
                setValue={setValue}
                register={register}
              />
              <Button onClick={() => onSubmit()}>Thay Đổi</Button>
            </form>
          }
          name="Thay Đổi CV"
          iconClose={<SyncAltIcon />}
        />
        <Modal
          modalTitle={"Xem CV"}
          open={opens}
          setOpen={setOpens}
          children={<img width={"100%"} src={props}></img>}
          name="CV"
          iconClose={<SyncAltIcon />}
        />
        <ButtonOutline
          onClick={() => handleClick(1)}
          className="profile__actions-item"
          icon={<SyncAltIcon />}
          outline="1.5px solid #DEDEDE"
          bg="#FFFFFF"
        />
        <ButtonOutline
          onClick={() => handleClick(2)}
          className="profile__actions-item"
          icon={<RemoveRedEyeIcon />}
          outline="1.5px solid #DEDEDE"
          bg="#FFFFFF"
        />
        <a href={props}>
          <ButtonOutline
            className="profile__actions-item"
            icon={<FileDownloadIcon />}
            outline="1.5px solid #DEDEDE"
            bg="#FFFFFF"
          />
        </a>
      </div>
    </div>
  );
};
