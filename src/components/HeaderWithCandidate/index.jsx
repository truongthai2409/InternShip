import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import MenuIcon from "@mui/icons-material/Menu";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { Link } from "react-router-dom";
import Login from "../Login";
import Logo from "../Logo";
import './styles.scss';
export default function HeaderWithCandidate() {

  return (
    <div className="container-header__hr header__hr config">
      <div onClick={() => { }} className="responsive-menu">
        <MenuIcon />
      </div>
      <Logo />
      <div className="header__hr">
        <Link to="/candidate/view-list-apply" className="header__hr-post">
          <PlaylistAddCheckOutlinedIcon fontSize="large" />
          <span className="header__hr-post-post">Công việc đã ứng tuyển</span>
        </Link>
        <Link to="/candidate/view-list-care" className="header__hr-post">
          <FormatAlignJustifyIcon />
          <span className="header__hr-post-post">Công việc đã quan tâm</span>
        </Link>
      </div>
      <div className="header__hr-icon">
        <Login />
      </div>
    </div>
  )
}
