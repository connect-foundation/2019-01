import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  QuizTh, QuizTr, DeleteButton, UpdateButton,
} from './style';
import fetchData from '../util';

const Row = ({ openModal, quiz }) => {
  const [quizInfo, setQuizInfo] = useState(quiz);
  const keys = Object.keys(quiz);

  const deleteButtonHandler = (id) => {
    fetchData('delete', '/admin/quiz', { id });
  };

  // const updateButtonHandler = (id) => {
  //   fetchData('put', '/admin/quiz', { id, quizInfo });
  // };

  const setQuiz = (e) => {
    console.log(e);
    // setQuiz((currentInfo) => {...currentInfo, e});
  };

  return (
    <QuizTr>
      {keys.map((key) => <QuizTh onChange={() => setQuiz()}>{quiz[key]}</QuizTh>)}
      <UpdateButton onClick={openModal}>수정</UpdateButton>
      <DeleteButton onClick={() => deleteButtonHandler(quiz.id)}>삭제</DeleteButton>
    </QuizTr>
  );
};

Row.propTypes = propTypes.shape({
  openModal: propTypes.func.isRequired,
  quiz: propTypes.object,
}).isRequired;

export default Row;
