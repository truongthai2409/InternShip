import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import './styles.scss';
import Grid from '@mui/material/Grid';
import Button from '../shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { Tab, Tabs } from '@mui/material';
import ContentBaseInformation from '../ContentBaseInfomation';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Appreciate from '../Appreciate';
import StarIcon from '@mui/icons-material/Star';
import './styles.scss';
import {
  addAppreciate,
  getAppreciateByCompany,
} from 'src/store/slices/main/candidate/appreciate/appreciateSlice';
import ArrowButton from 'src/components/shared/ArrowButton';
import Modal from 'src/components/shared/Modal';
import Textarea from 'src/components/shared/Textarea';
import { useForm } from 'react-hook-form';
import CustomInput from 'src/components/shared/CustomInput';
import CustomCheckbox from 'src/components/shared/CustomCheckbox';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Appreciate/validate';
import { getDemandListByUniId } from 'src/store/slices/main/home/demand/demandSlice';
import HeaderBaseInformationCompany from '../HeaderBaseInformationCompany';
import PaginationCustom from '../shared/Pagination';
import { useTranslation } from 'react-i18next';

function TabPanel(props) {
  const { t } = useTranslation('cardInformation');
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const currentPage = 1;
const limit = 5;

const BaseInformationCompany = ({
  jobDetail,
  jobDetailById,
  information,
  mt,
  appreciateList,
  appreciateListHasvePage,
  pdLeft,
  pdRight,
  pdTop,
  pdBottom,
  mgLeft,
  isPartner,
  jobListCompany,
  onChange,
  idCompany,
}) => {
  const { t } = useTranslation('cardInformation');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(2);
  const { user } = useSelector((state) => state.profile);
  let checked = false;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [valueTab, setValueTab] = useState(0);
  const dispatch = useDispatch();
  const uniId = jobDetail?.universityDTO?.id;

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [uniId, dispatch]);

  const handleChange = (event, newValue) => setValueTab(newValue);
  const [page, setPage] = useState(1);
  let topAppreciate = [];
  for (let i = 0; i < 1; i++) {
    topAppreciate.push(
      appreciateList
        ?.slice()
        ?.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        ?.sort((a, b) => b.id - a.id)[i]
    );
  }
  const handleBackClick = () => {
    navigate(-1, { replace: true });
  };
  const data = [];
  for (let i = 0; i < appreciateList?.length; i++) {
    data.push(appreciateList[i].score);
  }

  const res = data?.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);
  const rating = (res / data?.length).toFixed(2);

  const handleOpen = () => {
    if (user?.user?.id) {
      setOpen(true);
      reset();
    } else {
      toast.error(t('youNeedToLogInToEvaluateTheCompanyTL'), {
        position: 'top-right',
        autoClose: 3000,
        style: { color: '#00B074', backgroundColor: '#DEF2ED' },
      });
    }
  };
  const onSubmit = async (data) => {
    const username = user?.user?.username;
    const avaluateData = {
      comment: data.comment,
      score: valueRating,
      company: {
        id: idCompany,
      },
      user: {
        username: username,
      },
      title: data.title,
      hide: checked,
    };

    try {
      const res = await dispatch(addAppreciate(avaluateData));
      const values = {
        idCompany: idCompany,
        no: 0,
        limit: 10,
      };
      await dispatch(getAppreciateByCompany(values));
      if (res.payload.status === 200 || res.payload.status === 201) {
        toast.success(t('reviewHasBeenSubmittedTL'), {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        });
      } else {
        toast.error(res.payload.message, {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        });
      }
    } catch (error) {
      if (error.status === 400) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key],
          });
        }
      }
    }

    reset();
    setOpen(false);
  };

  const handleCheck = async (e) => {
    const check = e.target.checked;
    checked = check;
  };

  const handleChangeLinkViewAvaluate = (event, newValue) => {
    setValueTab(1);
  };

  const handleChangeAvaluate = (event, newValue) => {
    setValueTab(1);
    setOpen(true);
  };
  const handleChangePage = (e, value) => {
    e.preventDefault();
    setPage(value);
    onChange && onChange(value);
  };

  return (
    <div className=''>
      {information ? (
        <div>
          {jobDetail && (
            <div
              className={`base__information-candidate`}
              style={{
                marginTop: mt ? `${mt}` : '',
                paddingLeft: pdLeft ? `${pdLeft}` : '',
                paddingRight: pdRight ? `${pdRight}` : '',
                paddingTop: pdTop ? `${pdTop}` : '',
                paddingBottom: pdBottom ? `${pdBottom}` : '',
              }}
            >
              <HeaderBaseInformationCompany jobDetail={jobDetail} />
              <Box>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mt: 1,
                    fontSize: 3,
                  }}
                >
                  <Tabs
                    value={valueTab}
                    aria-label='basic tabs example'
                    textColor='primary'
                    scrollButtons
                    onChange={handleChange}
                  >
                    <Tab
                      label={t('jobTL')}
                      {...a11yProps(0)}
                      textColor='inherit'
                      sx={{ fontSize: 12 }}
                    />
                    <Tab
                      label={t('rateTL')}
                      {...a11yProps(1)}
                      textColor='inherit'
                      sx={{ fontSize: 12 }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={valueTab} index={0}>
                  <Box>
                    <Grid
                      sx={{ justifyContent: 'center' }}
                      container
                      spacing={2}
                    >
                      <Grid item xs={8}>
                        <Item
                          sx={{
                            marginTop: 0,
                            marginBottom: 0,
                            paddingBottom: 1,
                          }}
                          elevation={0}
                        >
                          <div className='intro__company'>
                            <h5
                              className='intro__company-title'
                              style={{ marginLeft: '25px' }}
                            >
                              {t('introductionAboutTheCompanyTL')}
                            </h5>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: jobDetail?.hr?.company?.description,
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                wordBreak: 'break-word',
                                marginLeft: '25px',
                                textAlign: 'justify',
                                paddingRight: '25px',
                                fontWeight: '450',
                                fontSize: '14px',
                                fontFamily: '$f-family',
                                fontStyle: 'normal',
                              }}
                            ></div>
                          </div>
                        </Item>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                          elevation={0}
                        >
                          <ContentBaseInformation
                            jobDetail={jobDetail}
                            jobListCompany={jobListCompany}
                            pdLeft={'35px'}
                            pdRight='25px'
                            mgLeft='25px'
                          />
                        </Item>
                      </Grid>
                      {user.user ? (
                        <Grid item xs={4}>
                          <Item
                            sx={{
                              marginTop: 3,
                              marginBottom: 3,
                            }}
                            elevation={0}
                          >
                            {information ? (
                              <div className='rating'>
                                <Rating
                                  precision={0.5}
                                  readOnly
                                  value={Number(rating)}
                                  size='medium'
                                  sx={{
                                    fontWeight: '800',
                                    fontSize: 32,
                                  }}
                                />

                                <Typography
                                  variant='h6'
                                  component='div'
                                  sx={{
                                    fontWeight: '700',
                                    fontSize: 13,
                                    paddingBottom: 2.5,
                                  }}
                                >
                                  {`${Number(rating)} ${t('inTL')} ${
                                    appreciateList?.length
                                  }  ${t('reviewsTL')}`}
                                </Typography>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {user.user && (
                                    <Button
                                      className='button-card'
                                      name={t('writeaReviewTL')}
                                      bwidth='150px'
                                      bheight='40px'
                                      onClick={handleChangeAvaluate}
                                    ></Button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </Item>

                          <Item
                            sx={{
                              paddingTop: 1,
                              paddingBottom: 2.3,
                            }}
                            elevation={0}
                          >
                            <h5
                              className='intro__company-title'
                              style={{
                                transform: 'translate(-7px,0px)',
                              }}
                            >
                              {t('latestReviewsTL')}
                            </h5>
                            <div>
                              {topAppreciate
                                .slice()
                                ?.sort(
                                  (a, b) =>
                                    new Date(b.createDate) -
                                    new Date(a.createDate)
                                )
                                ?.sort((a, b) => b.id - a.id)
                                ?.map((appreciate, index) => (
                                  <Appreciate
                                    appreciate={appreciate}
                                    key={index}
                                    fontSize='15px'
                                    idCompany={idCompany}
                                  />
                                ))}

                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              ></div>
                            </div>
                            <div className='button-card'>
                              <Link
                                to={`/information_company/${jobDetail?.hr?.company?.id}`}
                                value={valueTab}
                                index={1}
                              >
                                <Button
                                  name={t('viewAllReviewsTL')}
                                  bwidth='215px'
                                  bheight='40px'
                                  onClick={handleChangeLinkViewAvaluate}
                                ></Button>
                              </Link>
                            </div>
                          </Item>
                        </Grid>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Box>
                </TabPanel>
                {/* Tab Đánh giá */}
                <TabPanel value={valueTab} index={1}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                          elevation={0}
                        >
                          {user?.user ? (
                            <div>
                              <Rating
                                precision={0.5}
                                readOnly
                                value={Number(rating)}
                                size='large'
                                sx={{
                                  fontWeight: '800',
                                }}
                              />

                              <Typography
                                variant='h6'
                                component='div'
                                sx={{
                                  fontWeight: '700',
                                  // transform: "translate(5px,5px)",
                                  fontSize: 15,
                                }}
                              >
                                {`${Number(rating) || 0}  ${t('inTL')} ${
                                  appreciateList?.length
                                } ${t('reviewsTL')}`}
                              </Typography>
                              <div
                                style={{
                                  display: 'flex',
                                  alignContent: 'center',
                                  justifyContent: 'center',
                                }}
                              ></div>
                            </div>
                          ) : (
                            <Typography variant='h6'>
                              {t('youNeedTL')}{' '}
                              <Link to='/login'> {t('loginTL')} </Link>
                              {t('toBeAbleToViewAndRateTL')}
                            </Typography>
                          )}
                        </Item>
                        <Item
                          sx={{
                            paddingTop: 1,
                            paddingBottom: 2.3,
                            fontWeight: '600',
                          }}
                          elevation={0}
                        >
                          <div className='appreciate intro__company-title'>
                            <h4 style={{ marginTop: '0px', marginLeft: 0 }}>
                              {t('companyReviewTL')}{' '}
                            </h4>
                            <Modal
                              modalTitle={t('writeaReviewTL')}
                              open={open}
                              setOpen={setOpen}
                              iconClose={true}
                              children={
                                <div>
                                  <CustomInput
                                    label={t('enterTitleTL')}
                                    id='title'
                                    type='text'
                                    placeholder={t('greatTL')}
                                    register={register}
                                    requirementField={false}
                                    setValue={setValue}
                                    height='45px'
                                  />
                                  <Textarea
                                    label={t('writeaReviewTL')}
                                    id='comment'
                                    placeholder={t('enterhereTL')}
                                    register={register}
                                    setValue={setValue}
                                    check={true}
                                    children={t('pleaseEnterThisFieldTL')}
                                  >
                                    {errors.comment?.message}
                                  </Textarea>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='size-medium'
                                      value={valueRating}
                                      precision={0.5}
                                      // getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValueRating(newValue);
                                      }}
                                      sx={{
                                        fontSize: '20px',
                                        color: 'yellow',
                                      }}
                                      size='large'
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valueRating !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {/* {labels[hover !== -1 ? hover : valueRating]} */}
                                      </Box>
                                    )}
                                  </Box>
                                  <div onChange={handleCheck}>
                                    <CustomCheckbox label={t('anonymousTL')} />
                                  </div>
                                  <Button
                                    onClick={handleSubmit(onSubmit)}
                                    onChange={handleCheck}
                                    name={t('submitReviewTL')}
                                  />
                                </div>
                              }
                              name='list-candidate'
                            />
                            {user.user && (
                              <Button
                                name={t('writeaReviewTL')}
                                bwidth='150px'
                                bheight='40px'
                                onClick={handleOpen}
                              ></Button>
                            )}
                          </div>
                          <div>
                            {appreciateList
                              ?.slice()
                              ?.sort(
                                (a, b) =>
                                  new Date(b.createDate) -
                                  new Date(a.createDate)
                              )
                              ?.sort((a, b) => b.id - a.id)
                              ?.map((appreciate, index) => (
                                <div>
                                  <Appreciate
                                    appreciate={appreciate}
                                    idCompany={idCompany}
                                    key={appreciate.id}
                                  />
                                  <span style={{}} className='line'></span>
                                </div>
                              ))}
                          </div>
                          {appreciateListHasvePage.totalPages > 1 ? (
                            <PaginationCustom
                              page={page}
                              totalPages={appreciateListHasvePage.totalPages}
                              handleOnChange={handleChangePage}
                            />
                          ) : (
                            ''
                          )}
                          <div
                            className='demand-detail__back'
                            onClick={handleBackClick}
                          >
                            <ArrowButton direction='left' text={t('backTL')} />
                          </div>
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                          elevation={0}
                        >
                          <ContentBaseInformation
                            jobDetail={jobDetail}
                            jobListCompany={jobListCompany}
                            hideMark={true}
                            none__time={true}
                          />
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </Box>
            </div>
          )}
        </div>
      ) : (
        // trang home
        <div className='scrollCardInforCompany'>
          <div>
            {jobDetail && (
              <div
                className={`base__information-candidate`}
                style={{
                  marginTop: mt ? `${mt}` : '',
                  // border: '1px solid black'
                  paddingLeft: pdLeft ? `${pdLeft}` : '',
                  paddingRight: pdRight ? `${pdRight}` : '',
                  paddingTop: pdTop ? `${pdTop}` : '',
                  paddingBottom: pdBottom ? `${pdBottom}` : '',
                }}
              >
                <Box
                  sx={{
                    border: '1px solid #dedede',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    className='base__information-card'
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <div
                      style={{
                        marginRight: '16px',
                      }}
                    >
                      <Box
                        sx={{
                          width: 135,
                          height: 135,
                          borderRadius: '6px',
                          marginRight: '20px',
                          backgroundColor: 'white',
                          border: '1px solid #DEDEDE',
                          marginLeft: '25px',
                          marginTop: '25px',
                        }}
                      >
                        <img
                          className='img-logo'
                          alt=''
                          src='https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
                        />
                      </Box>
                    </div>
                    <div className='base__information-card-detail'>
                      <h3 className='company-name'>
                        {jobDetail?.hr?.company.name}
                      </h3>

                      <div className='company-info'>
                        <PhoneInTalkIcon
                          sx={{
                            fontSize: 17,
                            color: '#04bf8a',
                          }}
                        />
                        <Typography
                          variant='h6'
                          component='div'
                          sx={{
                            fontSize: 15,
                            fontWeight: '400',
                            transform: 'translate(5px,0px)',
                          }}
                        >
                          {jobDetail?.hr?.company.phone}
                        </Typography>
                      </div>
                      <div className='detail-email'>
                        <h5>
                          <EmailIcon
                            sx={{
                              fontSize: 15,
                              color: '#04bf8a',
                            }}
                          />
                          <a
                            href={`mailto:${jobDetail?.hr?.company.email}`}
                            className=' '
                          >
                            {jobDetail?.hr?.company.email}
                          </a>
                        </h5>
                      </div>
                      <div className='detail-website'>
                        <h5 className=''>
                          <LanguageIcon
                            sx={{
                              fontSize: 15,
                              color: '#04bf8a',
                            }}
                          />
                          <a
                            href={jobDetail?.hr?.company.website}
                            target='_blank'
                            rel='noopener noreferrer'
                            className=' '
                          >
                            {jobDetail?.hr?.company.website}
                          </a>
                        </h5>

                        <div className=' base__information-card-detail-location-candidate'>
                          <LocationOnIcon
                            sx={{
                              fontSize: 15,
                              color: '#04bf8a',
                              marginTop: '5px',
                            }}
                          />
                          <Typography
                            variant='h6'
                            component='div'
                            sx={{
                              fontSize: 16,
                              fontWeight: '400',
                              transform: 'translate(5px,5px)',
                            }}
                          >
                            {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Item
                        sx={{
                          marginTop: 1,
                          marginBottom: 1,
                          paddingBottom: 2.5,
                        }}
                        elevation={0}
                      >
                        <div className='intro__company'>
                          <h5
                            className='intro__company-title'
                            style={{ marginLeft: '5px' }}
                          >
                            {t('introductionAboutTheCompanyTL')}
                          </h5>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: jobDetail?.hr?.company?.description,
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              wordBreak: 'break-word',
                              marginLeft: '25px',
                              textAlign: 'justify',
                              paddingRight: '25px',
                              color: '#000000',
                              fontWeight: '400',
                              fontSize: '14px',
                              fontStyle: 'normal',
                            }}
                          ></div>
                        </div>
                      </Item>
                      <Item
                        sx={{
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                        elevation={0}
                      >
                        <ContentBaseInformation
                          jobDetail={jobDetail}
                          jobListCompany={jobListCompany}
                          pdLeft={'20px'}
                          pdRight='8px'
                          hideMark={true}
                        />
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

BaseInformationCompany.propTypes = {};

export default BaseInformationCompany;
