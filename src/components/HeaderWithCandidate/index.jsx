import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { Link } from "react-router-dom";
import './styles.scss';
export default function HeaderWithCandidate() {

  return (
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
  )
}
