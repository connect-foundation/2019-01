import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalWrapper, ModalContent, ModalButtonWrapper, ModalOkButton, ModalCloseButton,
} from './style';
import Row from './Row';

const ImageModal = ({ image, closeModal, fetchData }) => {
  const [categoryValue, setCategoryValue] = useState(image.category);
  const [nameValue, setNameValue] = useState(image.name);
  const [urlValue, setUrlValue] = useState(image.url);

  const fetchImage = () => {
    const imageInfo = {
      id: image.id,
      category: categoryValue,
      name: nameValue,
      url: urlValue,
    };

    fetchData(imageInfo);
    closeModal();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <Row
          category="category"
          value={categoryValue}
          changeValue={(e) => setCategoryValue(e.target.value)} />
        <Row
          category="name"
          value={nameValue}
          changeValue={(e) => setNameValue(e.target.value)} />
        <Row
          category="url"
          value={urlValue}
          changeValue={(e) => setUrlValue(e.target.value)} />
      </ModalContent>
      <ModalButtonWrapper>
        <ModalOkButton onClick={fetchImage}>확인</ModalOkButton>
        <ModalCloseButton onClick={closeModal}>취소</ModalCloseButton>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

ImageModal.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ImageModal;
