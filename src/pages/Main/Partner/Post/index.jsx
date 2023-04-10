import React from 'react';
import { useTranslation } from 'react-i18next';
import PostPartnerForm from 'src/containers/Home/PostPartnerForm';
import { TabTitle } from 'src/utils/GeneralFunctions';

const PartnerPost = () => {
  const { t } = useTranslation('title');
  TabTitle(`${t('PostArticleITInternshipJobsTLTL')}`);
  return <PostPartnerForm />;
};

export default PartnerPost;
