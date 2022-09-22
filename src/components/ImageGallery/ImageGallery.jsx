import PropTypes from 'prop-types';
import { ImageGallerySection } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  return <ImageGallerySection>{children}</ImageGallerySection>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
