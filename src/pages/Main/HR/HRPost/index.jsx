import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';
import PostJobForm from '../../../../containers/Home/PostJobForm';

const HRPost = () => {
  const { t } = useTranslation('title')
  TabTitle(`${t("postITInternshipJobsTL")}`);
  return <PostJobForm formStatus='post' />;
};

export default HRPost;
