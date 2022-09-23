import { useState } from "react";
import CardHome from "../CardHome";
import moment from "moment";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import PaginationCustome from "src/components/Pagination";
import RatingJob from "../RatingJob";

const ListCardJobHome = ({
  jobList,
  indexCardActive,
  positionJobValue,
  positionValue,
  onChange,
  jobListHavePages,
  allRating,
}) => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const handlePagination = (e, valuePage) => {
    setPage(valuePage);
    onChange && onChange(valuePage);
  };
  return (
    <>
      <div className="filter-panel-home__wrapper">
        {jobList && jobList?.length > 0 ? (
          jobList.map((job, index) => (
            <CardHome
              page={page}
              positionValue={positionValue}
              id={job.id}
              active={indexCardActive}
              index={index}
              key={job.id}
              title={job.name ? job.name : job.jobApp?.name}
              fontSize={10}
              nameCompany={
                job?.hr?.company?.name || job?.partner?.universityDTO.name || job?.jobApp?.company?.name
              }
              idCompany={job?.hr?.company?.id || job?.partner?.universityDTO.id}
              tagName={[
                job?.jobposition?.name || job?.position?.name || "Không có",
                job?.jobType?.name || "Không có",
              ]}
              location={job.locationjob?.district?.province?.name}
              amount={job.amount || "Không có"}
              demandPartner={true}
              time={[
                moment(job.timeStartStr || job.createDate).format("DD/MM/YYYY"),
                moment(job.timeEndStr || job.end).format("DD/MM/YYYY"),
              ]}
              locationPath={location.pathname}
            />
          ))
        ) : (
          <div style={{ textAlignLast: "center" }}>
            Không tìm thấy công việc
          </div>
        )}
      </div>
      {jobListHavePages?.totalPages > 5 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaginationCustome
            page={page}
            totalPages={jobListHavePages?.totalPages}
            handleOnChange={handlePagination}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default ListCardJobHome;
