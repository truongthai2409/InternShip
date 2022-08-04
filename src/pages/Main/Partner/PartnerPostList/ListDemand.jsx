import CardPost from "src/components/CardPost";
import Null from "src/components/Null";
import "./styles.scss";

const formatLocation = (location) => {
  return `${location.address}, ${location.district?.name},
      ${location.district?.province?.name}`;
};

export const ListDemand = ({ demandList, message }) => {
  return (
    <div className="hrpost__list">
      {demandList && demandList.length > 0 ? (demandList.map((job) => (
        <CardPost
          key={job.id}
          idDemand={job.id}
          status={job.status}
          jobName={job.name}
          amount={job.amount}
          timeStart={job?.createDate}
          timeEnd={job?.end}
          timeCreated={job.createDate}
          companyName={job.hr?.company?.name || job?.universityDTO?.name}
          companyLocation={job?.universityDTO?.address}
          isDemandPost={true}
        />
      ))) : <Null text={message} />}
    </div>
  );
};
