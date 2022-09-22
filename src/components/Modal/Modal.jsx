import { ModalOverlay, ModalSection } from './Modal.styled'
export const Modal = ({img, tags}) => {
    return (
        <ModalOverlay>
        <ModalSection>
          <img src={img} alt={tags} />
        </ModalSection>
      </ModalOverlay>
      )
  };