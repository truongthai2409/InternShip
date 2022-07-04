import * as React from 'react';
import TagName from "../TagName";
import "./styles.scss";
import Rating from "@mui/material/Rating";
import ButtonMark from "../ButtonMark";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { updateIdJobActive, updateIndexCardActive } from "../../store/slices/main/home/job/jobSlice";

function CardHome(props) {
    const dispatch = useDispatch();

    React.useEffect(() => {
        if(props.index === 0) {
            dispatch(updateIdJobActive(props.id))
        }
    }, [])

    const handleClick = () => {
        dispatch(updateIndexCardActive(props.index))
        dispatch(updateIdJobActive(props.id))
    }

    return (
        <div onClick = {handleClick} className={clsx('cardHome__container', (props.active === props.index ? 'active' : ''))}>
            <div className="cardHome__col1">
                <div className="cardHome__aboutCompany">
                    <img className="cardHome__img" src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png" alt="" />
                    <div>
                        <h4 className="cardHome__title">{props.title}</h4>
                        <p className="cardHome__nameCompany">{props.nameCompany}</p>
                    </div>
                </div>
                <div className="cardHome__tagName">
                    {props.tagName.map((tag) => (
                        <TagName key={tag} title={tag} />
                    ))}
                </div>
                <Rating name="read-only" precision={0.5} readOnly defaultValue={props.start} />
            </div>
            <div className="cardHome__col2">
                <ButtonMark height="32px" width="32px" fontSize="18px" />
                <div className="cardHome__col2-End">
                    <div className="cardHome__col2-End-1">
                        <AddLocationAltRoundedIcon style={{fontSize: `${props.fontSize + 2}px`}} />
                        <p style={{fontSize: `${props.fontSize}px`}}>{props.location}</p>
                    </div>
                    <div className="cardHome__col2-End-2">
                        <WatchLaterOutlinedIcon style={{fontSize: `${props.fontSize + 2}px`}} />
                        <p style={{fontSize: `${props.fontSize}px`}}>{`${props.time[0]} - ${props.time[1]}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardHome;
