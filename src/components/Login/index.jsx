import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByIdUser } from 'src/store/slices/Admin/user/userSlice';
import AccountMenu from '../AccountMenu';
import Button from '../Button';
import './styles.scss';

export default function Login() {
    const {profile} = useSelector(state=>state.user) 
    const dispatch = useDispatch()
    useEffect(() => {
        const idUser = JSON.parse(sessionStorage.getItem("userPresent"))?.idUser;
        dispatch(getProfileByIdUser(idUser))
    }, [])
    const renderLogin = () => {
        if (profile.id !== undefined) {
            return (
                <div className="header__hr-icon">
                    <div
                        className="responsive__hr-icon"
                        style={{
                            borderRadius: "14px",
                            backgroundColor: "#FFFFFF",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                        }}
                    >
                        <h4 className="name"> {profile?.user?.firstName} {profile?.user?.lastName}</h4>

                        <AccountMenu
                            linkImg={
                                profile?.user?.avatar
                                    ? `http://localhost:8085${profile?.user?.avatar}`
                                    : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                            }
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="login_container">
                    <Link to="/login">
                        <Button
                            bheight="45px"
                            name="Đăng Nhập"
                            className="login__home-login"
                        />
                    </Link>
                    <Link to="/register">
                        <Button
                            bheight="45px"
                            name="Đăng ký"
                            className="login__home-login"
                        />
                    </Link>
                </div>
            )
        }
    }
    return (
        <>
            {renderLogin()}
        </>
    )
}
