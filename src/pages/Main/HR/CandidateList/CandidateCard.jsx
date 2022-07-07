import React from 'react'

const CandidateCard = () => {
  return (
    <div>
        <div className="candidate-card__container">
            <div className="candidate-card__avatar"></div>
            <div className="candidate-card__info">
                <div className="candidate-card__name">
                    <h2>Thư</h2>
                </div>
                <div className="candidate-card__role">
                    <h3>Sinh viên</h3>
                </div>
                <div className="candidate-card__school">
                    <p>Trường học: Đại học Mở</p>
                </div>
                <div className="candidate-card__salary-expect">
                    <p>Lương mong muốn:</p>
                </div>
                <div className="candidate-card__location-job">
                    <p>Địa điểm: HCM</p>
                </div>
            </div>
            <div className="candidate-card__extra">
                <div className="candidate-card__apply-date"></div>
                <div className="candidate-card__view">
                    <div className="candidate-card__cv-viewer"></div>
                    <div className="candidate-card__save-choice"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CandidateCard