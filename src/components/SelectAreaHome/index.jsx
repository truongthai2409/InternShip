import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchAutoComplete from 'src/components/SearchAutoComplete';
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { getProvinceList } from "../../store/slices/location/locationSlice";
import { majorFilterChange } from '../../store/slices/main/candidate/user/userCandidateSlice';
import "./styles.scss";
export default function SelectAreaHome({ onChange }) {

  const dispatch = useDispatch();
  const { provinceList } = useSelector((state) => state.location);
  const { majorList } = useSelector(state => state.major)

  const user = JSON.parse(sessionStorage.getItem("userPresent"))
  React.useEffect(() => {
    dispatch(getMajorList())
    dispatch(getProvinceList());
  }, [dispatch]);
  const handleLabel = (value) => {
    if (value === null) {
      onChange && onChange("")
    } else {
      onChange && onChange(value.name)
      dispatch(majorFilterChange(value))
    }
  }
  return (

    <div className="config-select" style={{ fontSize: "14px" }}>
      {user && user.role === "Role_HR"
        ?
        <SearchAutoComplete
          data={majorList}
          avatarRender={null}
          nameRender={(option) => option.name}
          labelName="Chuyên nghành"
          onChange={(event, value) => handleLabel(value)}
          register={(option) => option}
        />
        :
        <SearchAutoComplete
          data={provinceList}
          avatarRender={null}
          nameRender={(option) => option.name}
          labelName="Khu vực"
          onChange={(event, value) => handleLabel(value)}
          register={(option) => option}
        />}
    </div>
  );
}
