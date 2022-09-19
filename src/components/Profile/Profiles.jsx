import React from 'react'
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfileByIdUser,
    getUserById
} from "src/store/slices/Admin/user/userSlice";
import ButtonOutline from "../ButtonOutline";
import InfoUser from "./InfoUser";
import { Actions } from './components';

export default function Profiles({setOpen}) {
    const role = (id) => {
        let role = "";
        switch (id) {
            case 1:
                role = "Nhà tuyển dụng";
                break;
            case 2:
                role = "Quản trị viên";
                break;
            case 3:
                role = "Ứng viên";
                break;
            default:
                role = "Cộng tác viên";
                break;
        }
        return role;
    };
    const gender = (id) => {
        let gender = "";
        switch (id) {
            case 0:
                gender = "Nam";
                break;
            case 1:
                gender = "Nữ";
                break;
            default:
                gender = "Khác";
        }
        return gender;
    };
    const dispatch = useDispatch();
    const { user, profile } = useSelector((state) => state.user);
    const idUser = JSON.parse(sessionStorage.getItem("userPresent"))?.idUser;
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        dispatch(getProfileByIdUser(idUser));
        dispatch(getUserById(idUser));
    }, [idUser]);
    return (
        <>
            {user?.role?.name?.includes("Role_Candidate") ? (
                <div className="candidate_container">
                    <div className="candidate_user">
                        <img
                            src={
                                profile?.user?.avatar
                                    ? `http://localhost:8085${profile?.user?.avatar}`
                                    : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                            }
                        />
                        <div className="candidate_user-info">
                            <h2>
                                {user.firstName + " " + user.lastName}
                                <ButtonOutline
                                    className="btn_user"
                                    onClick={handleOpen}
                                    icon={<EditIcon />}
                                    outline="none"
                                    color="#111111"
                                    fz="14px"
                                    radius="4px"
                                    padding="0"
                                />
                            </h2>
                            <p>@{user.username}</p>
                        </div>
                        <div className="candidate_user-actions">
                            <Actions
                                props={
                                    profile?.user?.avatar
                                        ? `http://localhost:8085${profile?.user?.avatar}`
                                        : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                                }
                            />
                        </div>
                    </div>

                    <div className="candidate_info">
                        <InfoUser
                            emailIcons={<EmailIcon />}
                            name="Email"
                            value={profile?.user?.email}
                        />
                        <InfoUser
                            emailIcons={<PhoneIcon />}
                            name="Số Điện Thoại"
                            value={profile?.user?.phone}
                        />
                        <InfoUser
                            emailIcons={<TransgenderIcon />}
                            name="Giới Tính"
                            value={gender(profile?.user?.gender)}
                        />
                        <InfoUser
                            emailIcons={<PersonIcon />}
                            name="Vai Trò"
                            value={profile?.user?.role?.name?.slice(5, 100)}
                        />
                    </div>
                </div>
            ) : (
                <div className="user-infor__wrapper">
                    <div className="profile__avatar">
                        <div>
                            <img
                                className="avatar__img"
                                src={
                                    user?.avatar
                                        ? `http://localhost:8085${user?.avatar}`
                                        : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                                }
                                alt="Ảnh đại diện"
                            />
                        </div>
                    </div>

                    <div className="profile__infor">
                        <h1 className="profile__infor-name">
                            {`${user?.lastName} ${user?.firstName}`}
                            <span className="profile__infor-location">
                                <ButtonOutline
                                    onClick={handleOpen}
                                    icon={<EditIcon />}
                                    outline="none"
                                    color="#111111"
                                    fz="14px"
                                    radius="4px"
                                    padding="0"
                                />
                            </span>
                        </h1>
                        <h4 className="profile__infor-username">@{user?.username}</h4>
                        <Divider orientation="horizontal" width="90%" height="2px" />
                        <br />
                        <div className="profile__infor-item">
                            <span>
                                <EmailIcon /> Email:
                            </span>
                            <h3>{user?.email}</h3>
                        </div>
                        <div className="profile__infor-item">
                            <span>
                                <PhoneIcon /> Số điện thoại:
                            </span>
                            <h3>{user?.phone}</h3>
                        </div>
                        <div className="profile__infor-item">
                            <span>
                                <TransgenderIcon /> Giới tính:
                            </span>
                            <h3>{gender(user?.gender)}</h3>
                        </div>
                        <div className="profile__infor-item">
                            <span>
                                <PersonIcon /> Vai trò:
                            </span>
                            <h3>{role(user?.role?.id)}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
