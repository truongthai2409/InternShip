import React, { useEffect, useState } from "react";
import "./styles.scss";
import ListCollapse from "../../shared/ListCollapse";

import { useDispatch, useSelector } from "react-redux";
import { getMajorListThunk } from "src/store/action/company/companyAction";
import { getJobPositionList } from "../../../store/slices/main/home/job/jobSlice";
import { useTranslation } from "react-i18next";

const listWorkingFormat = [
  { name: "Fulltime", id: 1 },
  { name: "Parttime", id: 2 },
  { name: "Remote", id: 3 },
];

const SideBarHomeList = ({ onChange, slideBarHome__wrapper = false }) => {
  const { t } = useTranslation("navbar");
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.profile);
  const [checkedType, setCheckedType] = useState([]);

  const userHR = user?.user?.role;

  useEffect(() => {
    dispatch(getMajorListThunk([1, 20]));
    dispatch(getJobPositionList());
  }, [dispatch]);

  const handleCheckType = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
    const typeIds = listWorkingFormat
      .filter((item) => updatedList.includes(item.name))
      .map((item) => item.id);
    console.log(typeIds, "id");
  };

  const handleCheckPosition = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      console.log(updatedList, "chekc oef");
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
    const positionIds = jobPosition
      .filter((item) => updatedList.includes(item.name))
      .map((item) => item.id);
    console.log(positionIds, "id 2");
  };

  const handleCheckMajor = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
    const majorIds = majorList
      .filter((item) => updatedList.includes(item.name))
      .map((item) => item.id);
    console.log(majorIds, "id 3 ");
  };

  console.log(checkedType, "checked");
  return (
    <div className={slideBarHome__wrapper ? `slideBarHome__wrapper` : ""}>
      <ListCollapse
        title={t("workTL")}
        list={listWorkingFormat}
        spacing={3}
        onChange={handleCheckType}
        checkedType={checkedType}
      />
      <ListCollapse
        title={t("jobPositionTL")}
        list={jobPosition}
        spacing={3}
        name="POSITIONJOBS"
        onChange={handleCheckPosition}
        checkedType={checkedType}
      />
      <ListCollapse
        title={t("majorTL")}
        list={majorList}
        spacing={3}
        name="MAJORJOBS"
        onChange={handleCheckMajor}
        checkedType={checkedType}
      />
    </div>
  );
};

export default SideBarHomeList;
