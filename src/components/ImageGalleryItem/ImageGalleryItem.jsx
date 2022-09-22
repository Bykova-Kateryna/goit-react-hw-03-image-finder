import PropTypes from 'prop-types';
import {
  ImageGalleryItemSection,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ array, openModal }) => {
  if (array) {
    return (
      <>
        {array.map(item => (
          <ImageGalleryItemSection
            key={item.id}
            onClick={() => {
              openModal(item.largeImageURL);
            }}
          >
            <ImageGalleryItemImg src={item.webformatURL} alt={item.tags} />
          </ImageGalleryItemSection>
        ))}
      </>
    );
  }
};

ImageGalleryItem.propTypes = {
  array: PropTypes.array,
  openModal: PropTypes.func,
};
