import React from 'react'
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

export default function ProfileHR() {
    const { profile } = useSelector((state) => state.user);
    return (
        <div className="company-infor__wrapper">
            <div className="company-infor__content">
                <div className="company-infor__col-1">
                    <img
                        className="company-infor__logo"
                        alt="Ảnh của công ty"
                        src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                    />
                    <p className="company-infor__name">{profile?.company?.name}</p>
                </div>
                <Divider orientation="horizontal" width="100%" height="2px" />
                <br />
                <div className="company-infor__profile">
                    <div className="company-infor__row">
                        <p className="company-infor__item">
                            <span>
                                {" "}
                                <EmailIcon />
                                Email:
                            </span>
                            <p className="screen__max-width-375px">
                                {profile?.company?.email}
                            </p>
                        </p>
                        <p className="company-infor__item">
                            <span>
                                <PhoneIcon />
                                Số điện thoại:
                            </span>
                            {profile?.company?.phone}
                        </p>
                    </div>
                    <div className="company-infor__row">
                        <p className="company-infor__item">
                            <span>
                                <LanguageIcon />
                                Website:
                            </span>
                            <a
                                style={{ textDecoration: "underline", color: "blue" }}
                                href={profile?.company?.website}
                                target="_blank"
                            >
                                {profile?.company?.website}
                            </a>
                        </p>
                        <p className="company-infor__item">
                            <span>
                                <ConfirmationNumberIcon />
                                Mã số thuế:
                            </span>
                            {profile?.company?.tax}
                        </p>
                    </div>
                    <p className="company-infor__des-company">
                        <span>Mô tả công ty:</span>
                        <br />
                        {profile?.company?.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
