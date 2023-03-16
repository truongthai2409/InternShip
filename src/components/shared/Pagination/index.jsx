import { Pagination, PaginationItem, Stack, Tooltip } from '@mui/material';
import './styles.scss';

const PaginationCustom = ({
  totalPages,
  page,
  handleOnChange,
  variant = 'text',
  shape,
  className,
}) => {
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
                ? 'Jump to first page'
                : item.type === 'previous'
                ? 'Go to previous page'
                : item.type === 'next'
                ? 'Go to next page'
                : item.type === 'end-ellipsis'
                ? 'Jump to last page'
                : `Go to page ${item.page}`
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
