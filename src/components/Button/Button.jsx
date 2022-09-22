import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ loadeMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={loadeMore}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  loadeMore: PropTypes.func,
};
