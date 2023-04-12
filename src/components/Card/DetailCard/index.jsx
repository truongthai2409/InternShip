import PropTypes from 'prop-types';
import Detail from './component';
import './styles.scss';

const DetailCard = ({
  jobDetail,
  jobList,
  candidate,
  jobPostHR,
  jobDetailById,
  demandPartner = false,
  jobListCompany,
}) => {
  return (
    <div>
      {jobList && jobList.length > 0 ? (
        <Detail
          jobDetail={jobDetail}
          demandPartner={demandPartner}
          jobListCompany={jobListCompany}
          jobDetailById={jobDetailById}
        />
      ) : (
        (
          <Detail demandPartner={demandPartner} jobDetailById={jobDetailById} />
        ) || null
      )}
    </div>
  );
};

DetailCard.propTypes = {
  logo: PropTypes.string.isRequired,
  nameMajor: PropTypes.string,
  nameCompany: PropTypes.string,
  detailJob: PropTypes.string,
  requireJob: PropTypes.string,
  timeJob: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DetailCard;
