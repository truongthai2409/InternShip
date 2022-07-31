import { useEffect } from "react";
import Button from "../../../../components/Button";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "src/utils/GeneralFunctions";
import { getPartnerByUserID } from "src/store/slices/Admin/university/unversitySlice";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";
import PartnerPostCard from "./PartnerPostCard";

const PartnerPostList = (props) => {
  TabTitle("Danh sách bài đăng | IT Internship JOBS");
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state) => state.university);
  const { demandListUniversity } = useSelector((state) => state.demand);
  const userPresent = JSON.parse(localStorage.getItem("userPresent"));
  // console.log(activeUser?.universityDTO?.id);

  useEffect(() => {
    dispatch(getPartnerByUserID(userPresent.idUser));
    dispatch(getDemandListByUniId(activeUser?.universityDTO?.id));
  }, [activeUser?.universityDTO?.id]);

  return (
    <div className="hrpost__list">
      <div className="hrpost__list-bt">
        <Button name="ĐĂNG BÀI"></Button>
      </div>
      {demandListUniversity?.contents &&
        demandListUniversity?.contents.map((demand) => (
          <div className="partner-post-list__container" key={demand.id}>
            <PartnerPostCard
              jobName={demand.name}
              schoolName={demand.universityDTO.name}
              description={demand.description}
              timeStart={demand.createDate}
              timeEnd={demand.end}
              timeCreated={demand.createDate}
            />
          </div>
        ))}
    </div>
  );
};

export default PartnerPostList;
