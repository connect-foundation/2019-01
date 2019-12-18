import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageTh, ImageTr, ImageButton,
} from './style';
import fetchData from '../util';
import URL from '../../../constants/url';

const Row = ({ openModal, image }) => {
  const columns = Object.keys(image);

  const deleteButtonHandler = (id) => {
    fetchData('delete', URL.ADMIN.IMAGE, { id });
  };

  return (
    <ImageTr>
      {columns.map((key) => <ImageTh>{image[key]}</ImageTh>)}
      <ImageTh>
        <ImageButton onClick={openModal}>수정</ImageButton>
        <ImageButton onClick={() => deleteButtonHandler(image.id)}>삭제</ImageButton>
      </ImageTh>
    </ImageTr>
  );
};

Row.propTypes = {
  openModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Row;
