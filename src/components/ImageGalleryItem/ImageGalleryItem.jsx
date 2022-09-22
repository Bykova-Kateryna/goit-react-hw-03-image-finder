
import { ImageGalleryItemSection, ImageGalleryItemImg } from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({ array }) => {
if(array){
  return (
    <>
    {array.hits.map((item) => <ImageGalleryItemSection key={item.id}>
       <ImageGalleryItemImg src={item.webformatURL} alt={item.tags} />
        </ImageGalleryItemSection>)}
    </>
    )
}
}