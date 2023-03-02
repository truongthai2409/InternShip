import './styles.scss';
import { FOOTER } from 'src/config/constant/footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const { CONTACT, ABOUT, POLICY, MOBILE } = FOOTER;

function Footer() {
  const { t } = useTranslation('headerFooter');
  const renderFooter = (sectionData) => {
    return (
      <>
        <h2 className='render-title'>{t(sectionData.title)}</h2>
        {sectionData.content.map((item, index) => {
          const renderData = item.hasOwnProperty('title') ? (
            <div className='render-container'>
              <p key={`subTitle-${index}`} className='render-subTitle'>
                {t(item.title)}
              </p>
              <p key={`des-${index}`} className='render-description-flex'>
                {t(item.description)}
              </p>
            </div>
          ) : (
            <div className='render-description-none'>
              {item.hasOwnProperty('href') ? (
                <Link key={`link-${index}`} to={item.href}>
                  {t(item.description)}
                  <img
                    src={item.image}
                    alt={t(item.alt)}
                    style={{ width: '200px' }}
                  />
                </Link>
              ) : (
                <p key={`desc-${index}`} className='render-description-none'>
                  {t(item.description)}
                </p>
              )}
            </div>
          );
          return renderData;
        })}
      </>
    );
  };
  return (
    <div className='footer-container'>
      <div className='footer-detail'>
        <div className='footer-contact'>{renderFooter(CONTACT)}</div>
        <div className='footer-about'>{renderFooter(ABOUT)}</div>
        <div className='footer-policy'>{renderFooter(POLICY)}</div>
        <div className='footer-mobile'>{renderFooter(MOBILE)}</div>
      </div>
      <p className='footer-copyright'>
        Copyright © 2022 R2S. All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
