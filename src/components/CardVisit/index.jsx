import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './styles.scss'
import Button from '../Button'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'
import { Link } from 'react-router-dom'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import LanguageIcon from '@mui/icons-material/Language'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import PropTypes from 'prop-types'

export default function CardVisit(props) {
  return (
    <div className="scroll scroll__onTablet-hide ">
      <Card className="visit__card visit__card__onTablet">
        <CardContent>
          <img
            className="visit__card-logo"
            alt="visit__card-logo"
            src={props.logo}
          />
          <h2 className="visit__card-nameComapy">{props.nameCompany}</h2>
          <Typography
            variant="body2"
            sx={{ ml: 1, mt: 3, mb: 3 }}
            className="visit__card-detail"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus cum
            illum eaque exercitationem maxime quasi debitis! Obcaecati corporis,
            esse minima illo labore vitae. Minus, dolore. Pariatur eum
            repudiandae possimus sunt.
          </Typography>

          <div className="config__info">
            <Link to="/detail" className="config__info">
              <LocalPostOfficeIcon className="config__info-icon"></LocalPostOfficeIcon>
              {props.emailCompany}
            </Link>
          </div>
          <div className="config__info">
            <Link to="/detail" className="config__info">
              <PhoneInTalkIcon className="config__info-icon"></PhoneInTalkIcon>
              {props.phoneCompany}
            </Link>
          </div>
          <div className="config__info">
            <Link to="/detail" className="config__info">
              <LanguageIcon className="config__info-icon"></LanguageIcon>
              {props.website}
            </Link>
          </div>
          <div className="config__info">
            <Link to="/detail" className="config__info">
              <AddLocationAltIcon className="config__info-icon"></AddLocationAltIcon>
              {props.location}
            </Link>
          </div>
        </CardContent>
        <CardActions className="config-button">
          <Button name="Về Chúng Tôi"></Button>
        </CardActions>
      </Card>
    </div>
  )
}

CardVisit.propTypes = {
  logo: PropTypes.string.isRequired,
  nameCompany: PropTypes.string.isRequired,
  emailCompany: PropTypes.string.isRequired,
  phoneCompany: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  website: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}
