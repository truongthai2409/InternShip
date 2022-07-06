import React from "react";
import PropTypes from "prop-types";
import Button from "../../../../components/Button";
import "./styles.scss";
import CardPost from "../../../../components/CardPost";


const HRPostList = (props) => {
    return (
        <div className="hrpost__list">
            <div className="hrpost__list-bt">
                <Button name="ĐĂNG BÀI"></Button>
            </div>
            <CardPost status={1} />
            <CardPost status={4}/>
            <CardPost />
        </div>
    );
};

HRPostList.propTypes = {};

export default HRPostList;
