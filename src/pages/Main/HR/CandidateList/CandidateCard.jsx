import React, { useState } from 'react';
import './styles.scss';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ButtonMark from 'src/components/shared/ButtonMark';
import Modal from 'src/components/shared/Modal';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export const CandidateCard = ({
  avatar = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
  candidate,
}) => {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [numberCV, setNumberCV] = useState([]);
  const viewProfileCV = (info) => {
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
            <Document file={numberCV} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        }
      />
    );
  };
  return (
    <>
      <div className='candidate-card__wrapper'>
        <img
          src={candidate?.user?.avatar || avatar}
          alt='ảnh đại diện'
          className='candidate-card__avatar'
        />
        <div className='candidate-card__infor'>
          <div className='row'>
            <h2 className='candidate-card__infor-name'>{`${candidate?.user?.lastName} ${candidate?.user?.firstName}`}</h2>
          </div>
          <p className='candidate-card__infor-item'>
            <span>Chuyên ngành:</span>
            {`${candidate?.major?.name}`}
          </p>
          <p className='candidate-card__infor-item'>
            <span>Số điện thoại:</span>
            {`${candidate?.user?.phone}`}
          </p>
          <p className='candidate-card__infor-item'>
            <span>Email:</span>
            {`${candidate?.user?.email}`}
          </p>
        </div>
        <div className='candidate-card__actions'>
          <div
            className='view-button__wrapper'
            onClick={() => viewProfileCV(candidate)}
          >
            <RemoveRedEyeIcon />
            <p>Xem CV</p>
          </div>
          <div style={{ display: 'none' }}>
            <ButtonMark border='1px solid #DEDEDE' />
          </div>
        </div>
        <p className='candidate-card__infor-time'>
          <AccessTimeIcon />
          09/06/2022
        </p>
        {renderCV()}
      </div>
    </>
  );
};

export default CandidateCard;
