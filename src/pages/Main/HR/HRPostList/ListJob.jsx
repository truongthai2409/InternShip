import CardPost from "src/components/CardPost";
import Null from "src/components/Null";
import "./styles.scss";

const formatLocation = (location) => {
  return `${location.address}, ${location.district?.name},
      ${location.district?.province?.name}`;
};

export const ListJob = ({ listJob }) => {
  return (
    <div className="hrpost__list">
      {listJob.length > 0 ? (listJob.map((job) => (
        <CardPost
          key={job.id}
          status={job.status}
          jobName={job.name}
          amount={job.amount}
          timeStart={job.timeStartStr}
          timeEnd={job.timeEndStr}
          timeCreated={job.createDate}
          companyName={job.hr?.company?.name}
          companyLocation={formatLocation(job.locationjob)}
        />
      ))) : <Null text="Không có công việc đã đóng." />}
    </div>
  );
};
