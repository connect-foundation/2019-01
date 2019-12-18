import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalContentRow, ModalContentCategory,
  ModalContentValue,
} from './style';

const Row = ({ category, value, changeValue }) => (
  <ModalContentRow>
    <ModalContentCategory>{category}</ModalContentCategory>
    <ModalContentValue value={value} onChange={changeValue} />
  </ModalContentRow>
);

Row.propTypes = {
  category: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default Row;
