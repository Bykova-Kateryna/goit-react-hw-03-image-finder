import PropTypes from 'prop-types';
import {
  ImageGalleryItemSection,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  imageItem,
  description,
  modalImage,
  openModal,
}) => {
  return (
    <ImageGalleryItemSection
      key={id}
      onClick={() => {
        openModal(modalImage);
      }}
    >
      <ImageGalleryItemImg src={imageItem} alt={description} />
    </ImageGalleryItemSection>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageItem: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
