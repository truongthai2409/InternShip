import { Pagination, PaginationItem, Stack, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const PaginationCustom = ({
  totalPages,
  page,
  handleOnChange,
  variant = 'text',
  shape,
  className,
}) => {
  const { t } = useTranslation('pagination');
  return (
    <Stack
      className={`pagination__wrapper ${className ? className : ''}`}
      spacing={2}
    >
      <Pagination
        page={page}
        onChange={handleOnChange}
        count={totalPages}
        variant={variant}
        shape={shape}
        renderItem={(item) => (
          <Tooltip
            title={
              item.type === 'start-ellipsis'
                ? t('firstPage')
                : item.type === 'previous'
                ? t('prePage')
                : item.type === 'next'
                ? t('nextPage')
                : item.type === 'end-ellipsis'
                ? t('lastPage')
                : `${t('goTo')} ${item.page}`
            }
          >
            <PaginationItem {...item} />
          </Tooltip>
        )}
      />
    </Stack>
  );
};

export default PaginationCustom;
