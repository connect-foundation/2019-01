import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import fetchData from '../util';
import URL from '../../../constants/url';

const Row = ({ openModal, quiz, openSnackbar }) => {
  const deleteButtonHandler = () => {
    fetchData('delete', URL.ADMIN.QUIZ, { id: quiz.id })
      .then(({ result }) => openSnackbar(result));
  };

  return (
    <TableRow>
      <TableCell>{quiz.id}</TableCell>
      <TableCell>{quiz.category}</TableCell>
      <TableCell>{quiz.level}</TableCell>
      <TableCell>{quiz.question}</TableCell>
      <TableCell>{quiz.comment}</TableCell>
      <TableCell>{quiz.answer}</TableCell>
      <TableCell align="right" style={{ width: '200px' }}>
        <Button
          variant="contained"
          onClick={() => openModal(quiz)}>
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
  quiz: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default Row;
