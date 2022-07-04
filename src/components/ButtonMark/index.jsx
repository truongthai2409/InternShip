import "./styles.scss";
import { useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const ButtonMark = (props) => {
    const [mark, setMark] = useState(true);
    const handleClick = (e) => {
        e.stopPropagation();
        setMark(!mark);
    };

    return (
        <IconButton
            style={{ border: "1px solid #F1F1F1", borderRadius: "4px", width: `${props.width}`, height: `${props.height}` }}
            aria-label="mark"
            onClick={handleClick}
            className="buttonMark__wrapper"
        >
            {mark ? (
                <BookmarkBorderIcon style={{ fontSize: `${props.fontSize}` }} />
            ) : (
                <BookmarkIcon className="buttonMark__isChecking" style={{ fontSize: `${props.fontSize}` }} />
            )}
        </IconButton>
    );
};

export default ButtonMark;
