import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';
import Main from '../..';

const CandidateHome = () => {
  const { t } = useTranslation('title');
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  TabTitle(t("homeTL"));
  return (
    <div>
      <Main />
    </div>
  );
};

export default CandidateHome;
