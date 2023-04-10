import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import PeopleIcon from '@mui/icons-material/People';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { Tooltip } from '@mui/material';
import Rating from '@mui/material/Rating';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonMark from '../../shared/ButtonMark';
import TagName from '../../Home/TagName';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import { Document, Page, pdfjs } from 'react-pdf';
import Modal from 'src/components/shared/Modal';

const CardHome = (props) => {
  const dispatch = useDispatch();
  const currenUrl = window.location.href.split('/').slice(-1).pop();
  const domain = window.location.href.split('/')[0];

  const [isMarkLength, setIsMarkLength] = useState();

  const { jobCare, jobApplyList } = useSelector(
    (state) => state.jobCandidateSlice
  );
  const { user } = useSelector((state) => state.profile);
  const [idCareJob, setIdCareJob] = useState('');

  useEffect(
    () => {
      let isMark = jobCare.filter((job) => {
        return job?.jobDTO?.id == props?.id;
      });
      setIdCareJob(isMark[0]?.id);
      setIsMarkLength(isMark.length > 0 ? true : false);
    },
    [jobCare, props?.id],
    dispatch
  );
  const navigate = useNavigate();
  const handleNext = () => {
    if (props.reload && props.reload == true) {
      window.open(`${domain}/detail_job/${props.id}`);
    } else {
      navigate(`/detail_job/${props.id}`);
    }
  };
  // open cv

  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [numberCV, setNumberCV] = useState([]);
  const viewProfileCV = (info, e) => {
    e.stopPropagation();
    setOpen(!open);
    setNumberCV(info.cv);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const renderCV = () => {
    return (
      <Modal
        iconClose={true}
        modalTitle={'View CV'}
        open={open}
        setOpen={setOpen}
        children={
          <div>
            <Document
              file={numberCV}
              onLoadSuccess={onDocumentLoadSuccess}
              wrap={false}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  wrap={false}
                />
              ))}
            </Document>
          </div>
        }
      />
    );
  };

  return (
    <div
      className={clsx(
        'cardHome__container',
        props.active === props.index ? 'active' : ''
      )}
      style={{
        paddingLeft: props.pdLeft ? props.pdLeft : '',
        paddingRight: props.pdRight ? props.pdRight : '',
        width: props.reload ? '100%' : '',
      }}
    >
      <div
        className='cardHome__col1'
        dataset={props.id}
        style={{ flexBasis: props.reload ? '65%' : '80%' }}
      >
        <div onClick={() => handleNext()}>
          <div className='cardHome__aboutCompany'>
            <img
              className='cardHome__img'
              src='https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
              alt=''
            />
            <div
              style={{ textAlign: 'left' }}
              className='cardHome__aboutCompany__right'
            >
              <Tooltip title={props.title} placement='top'>
                <h4 className='cardHome__title'>{props.title}</h4>
              </Tooltip>
              <p className='cardHome__nameCompany'>{props.nameCompany}</p>
              {props.demandPartner ? (
                <div className='cardHome__amount-hr-apply'>
                  <AddLocationAltRoundedIcon
                    style={{ fontSize: `13px` }}
                    sx={{ color: '#04bf8a' }}
                  />

                  <p
                    style={{
                      fontSize: `13px`,
                      width: 'max-content',
                      color: '#000',
                    }}
                  >
                    {props.location}
                  </p>
                </div>
              ) : (
                <Rating
                  name='read-only'
                  precision={0.5}
                  readOnly
                  value={props.star ?? ' '}
                />
              )}
            </div>
          </div>
          {props.viewCV ? (
            <button
              className='button_view_cv'
              onClick={(e) => viewProfileCV(props, e)}
            >
              <FeedIcon sx={{ fontSize: '13px' }} />
              <p>Xem cv</p>
              {renderCV()}
            </button>
          ) : (
            <div className='cardHome__tagName'>
              {props?.tagName?.map((tag, indexs) =>
                tag?.length > 0 ? (
                  tag?.map((item, index) => {
                    return item?.length > 0 ? (
                      item?.map((ite, idx) => {
                        return <TagName key={idx} title={ite?.name || null} />;
                      })
                    ) : (
                      <TagName key={index} title={item?.name || null} />
                    );
                  })
                ) : (
                  <TagName key={indexs} title={tag?.name || null} />
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className='cardHome__col2'>
        {props.hiddent ? (
          <div style={{ visibility: 'hidden' }}>
            <ButtonMark
              height='32px'
              width='32px'
              fontSize='18px'
              jobId={props.id}
              isMark={false}
            />
          </div>
        ) : (
          <>
            {user?.roleDTO?.name?.includes('Role_Candidate') &&
            props.reload == false ? (
              <ButtonMark
                height='32px'
                width='32px'
                fontSize='18px'
                jobId={props.id}
                isMark={isMarkLength}
                idCare={idCareJob}
              />
            ) : (
              <div style={{ visibility: 'hidden' }}>
                <ButtonMark
                  height='32px'
                  width='32px'
                  fontSize='18px'
                  jobId={props.id}
                  isMark={false}
                />
              </div>
            )}
          </>
        )}
        {props.none__time ? (
          <div className='cardHome__col2-End-1'>
            <div className='cardHome__amount-hr-apply'>
              <PeopleIcon sx={{ color: '#04bf8a !important' }} />
              <span className='amount'>Số lượng ứng viên: {props.amount}</span>
            </div>
          </div>
        ) : (
          <div className='cardHome__col2-End'>
            <div className='cardHome__col2-End-1'>
              {currenUrl === 'view-list-apply' ? (
                <></>
              ) : (
                <>
                  <PeopleIcon style={{ fontSize: `${props.fontSize + 2}px` }} />
                  <span
                    className='amount'
                    style={{
                      fontSize: `${props.fontSize}px`,
                      color: '#000',
                      marginLeft: '6px',
                    }}
                  >
                    Số lượng ứng viên: {props.amount}
                  </span>
                </>
              )}
            </div>
            <div className='cardHome__col2-End-2'>
              {currenUrl === 'view-list-apply' ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div>
                    <WatchLaterOutlinedIcon
                      style={{ fontSize: `${props.fontSize + 2}px` }}
                    />
                    <p style={{ fontSize: `${props.fontSize}px` }}>
                      {/* please help me write function datetime to handle this */}
                      {/* because i dont have any time so i fix this by my way */}
                      {props.appliedDate.split(' ')[0].replace(/-/g, '/')}
                    </p>
                  </div>
                  <p style={{ fontSize: `${props.fontSize}px` }}>
                    {/* please help me write function datetime to handle this */}
                    {/* because i dont have any time so i fix this by my way */}
                    {props.appliedDate.split(' ')[1].substring(0, 5)}
                  </p>
                </div>
              ) : (
                <>
                  <WatchLaterOutlinedIcon
                    style={{ fontSize: `${props.fontSize + 2}px` }}
                  />
                  <p style={{ fontSize: `${props.fontSize}px` }}>
                    {`${props.time[0]} - ${props.time[1]}`}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHome;
