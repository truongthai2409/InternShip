import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';
import Main from '../..';
import './styles.scss';

const PartnerHome = () => {
  const { t } = useTranslation('title');
  TabTitle(`${t('homepageForPartnersITInternshipJobsTL')}`);

  return <Main partner={true} />;
};

export default PartnerHome;
