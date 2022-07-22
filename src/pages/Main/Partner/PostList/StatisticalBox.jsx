import React from 'react'
import StatisticalCard from 'src/components/StatisticalCard'
import './styles.scss'

const StatisticalBox = ({ heading, title1, title2, content1, content2 }) => {
  return (
    <div>
      <div className="statistical-box">
        <div className="statistical-box__heading">{heading}</div>
        <div className="statistical-box__card">
          <StatisticalCard title={title1} content={content1} />
          <StatisticalCard title={title2} content={content2} />
        </div>
      </div>
    </div>
  )
}

export default StatisticalBox
