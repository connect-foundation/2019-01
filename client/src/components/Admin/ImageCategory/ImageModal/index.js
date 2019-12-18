import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ModalWrapper, ModalButtonWrapper } from '../../style';

const ImageModal = ({
  image, open, closeModal, fetchData,
}) => {
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
    <Modal open={open}>
      <ModalWrapper>
        <TextField
          label="category"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)} />
        <TextField
          label="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)} />
        <TextField
          label="url"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)} />
        <ModalButtonWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchImage}>
          확인
          </Button>
          <Button
            variant="contained"
            onClick={closeModal}>
          취소
          </Button>
        </ModalButtonWrapper>
      </ModalWrapper>
    </Modal>
  );
};

ImageModal.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ImageModal;
