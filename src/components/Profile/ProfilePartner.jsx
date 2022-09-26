import React from 'react'
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfileByIdUser
} from "src/store/slices/Admin/user/userSlice";
import "./reponsive.scss";
export default function ProfilePartner() {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.user);

    useEffect(() => {
        const userSessionStore = JSON.parse(sessionStorage.getItem("userPresent"));
        dispatch(getProfileByIdUser([userSessionStore.idUser, userSessionStore.token]));
    }, [dispatch]);
    return (
        <div className="company-infor__wrapper">
            <h2 className="company-infor__title">Trường</h2>
            <Divider />
            <div className="company-infor__content">
                <div className="company-infor__col-1">
                    <img
                        className="company-infor__logo"
                        alt="Ảnh của trường"
                        src={
                            profile?.universityDTO?.avatar
                                ? `${profile?.universityDTO?.avatar}`
                                : "https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                        }
                    />
                    <p className="company-infor__name">{profile?.universityDTO?.name}</p>
                </div>
                <div className="company-infor__col-2">
                    <div className="company-infor__profile">
                        <div className="company-infor__row">
                            <p className="company-infor__item">
                                <span>Email:</span>
                                {profile?.universityDTO?.email}
                            </p>
                            <p className="company-infor__item">
                                <span>Số điện thoại:</span>
                                {profile?.universityDTO?.phone}
                            </p>
                        </div>
                        <div className="company-infor__row">
                            <p className="company-infor__item">
                                <span>Website:</span>
                                <a
                                    style={{ textDecoration: "underline", color: "blue" }}
                                    href={profile?.universityDTO?.website}
                                    target={`_blank`}
                                >
                                    {profile?.universityDTO?.website}
                                </a>
                            </p>
                            <p className="company-infor__item">
                                <span>Tên viết tắt:</span>
                                {profile?.universityDTO?.shortName}
                            </p>
                        </div>
                        <p className="company-infor__des-company">
                            <span>Mô tả về trường:</span>
                            <br />
                            {profile?.universityDTO?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
