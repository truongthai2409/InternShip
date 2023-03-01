import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HeaderBaseInformationCompany from 'src/components/HeaderBaseInformationCompany';
import InfomationDemandBase from 'src/components/InfomationDemandBase';
import { getDemandListByUniId } from 'src/store/slices/main/home/demand/demandSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import './styles.scss';
const InfomationDemand = () => {
  TabTitle('Thông tin truờng');
  const currentPage = 1;
  const limit = 20;
  const location = useLocation();
  const uniId = parseInt(location.pathname.slice(19, 20));

  const dispatch = useDispatch();

  const { demandListUniversity } = useSelector((state) => state.demand);

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [dispatch, uniId]);
  return (
    <div className='demandUniverSity'>
      <HeaderBaseInformationCompany
        jobDetail={demandListUniversity?.contents?.[0]}
      />
      <InfomationDemandBase arrDemand={demandListUniversity} />
    </div>
  );
};

export default InfomationDemand;
