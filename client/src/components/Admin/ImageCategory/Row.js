import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { fetchData } from '../../../util';
import URL from '../../../constants/url';
import { LAST_CELL_WITDH } from '../style';

const Row = ({ openModal, image, openSnackbar }) => {
  const deleteButtonHandler = () => {
    fetchData('delete', URL.ADMIN.IMAGE, { id: image.id })
      .then(({ result }) => openSnackbar(result));
  };

  return (
    <TableRow>
      <TableCell>{image.id}</TableCell>
      <TableCell>{image.category}</TableCell>
      <TableCell>{image.name}</TableCell>
      <TableCell>{image.url}</TableCell>
      <TableCell align="right" style={LAST_CELL_WITDH}>
        <Button
          variant="contained"
          onClick={() => openModal(image)}>
          수정
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteButtonHandler}>
          삭제
        </Button>
      </TableCell>
    </TableRow>
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
  openSnackbar: PropTypes.func.isRequired,
};

export default Row;
