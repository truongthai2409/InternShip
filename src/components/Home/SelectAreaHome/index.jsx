import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SearchAutoComplete from 'src/components/shared/SearchAutoComplete';
import { getProvinceList } from '../../../store/slices/location/locationSlice';
import './styles.scss';

export default function SelectAreaHome({ onChange }) {
  const dispatch = useDispatch();
  const { provinceList } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.profile);
  const { t } = useTranslation('search');

  React.useEffect(() => {
    dispatch(getProvinceList());
  }, [dispatch]);
  const userHR = user?.user?.role;
  const handleLabel = (value) => {
    if (value === null) {
      onChange && onChange('');
    } else if (userHR && userHR?.name === 'Role_HR') {
      onChange && onChange(value.id);
    } else {
      onChange && onChange(value.name);
    }
  };
  return (
    <div className='config-select' style={{ fontSize: '14px' }}>
      <SearchAutoComplete
        data={provinceList}
        avatarRender={null}
        nameRender={(option) => option.name}
        labelName={t('searchByLocationTL')}
        onChange={(event, value) => handleLabel(value)}
        register={(option) => option}
      />
    </div>
  );
}
