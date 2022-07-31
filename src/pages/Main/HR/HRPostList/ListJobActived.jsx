import CardPost from "src/components/CardPost";
import "./styles.scss";

const formatLocation = (location) => {
  return `${location.address}, ${location.district?.name},
      ${location.district?.province?.name}`;
};

export const ListJobActive = ({listJob}) => {
  return (
    <div className="hrpost__list">
      {listJob.map((job) => (
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
      ))}
    </div>
  );
};

