import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  QuizTh, QuizTr, DeleteButton, UpdateButton,
} from './style';
import fetchData from '../util';

const Row = ({ quiz }) => {
  const [quizInfo, setQuizInfo] = useState(quiz);
  const keys = Object.keys(quiz);

  const deleteButtonHandler = (id) => {
    fetchData('delete', '/admin/quiz', { id });
  };

  const updateButtonHandler = (id) => {
    fetchData('put', '/admin/quiz', { id, quizInfo });
  };

  const setQuiz = (e) => {
    console.log(e);
    // setQuiz((currentInfo) => {...currentInfo, e});
  };

  return (
    <QuizTr>
      {keys.map((key) => <QuizTh onChange={() => setQuiz()}>{quiz[key]}</QuizTh>)}
      <UpdateButton onClick={() => updateButtonHandler(quiz.id)}>수정</UpdateButton>
      <DeleteButton onClick={() => deleteButtonHandler(quiz.id)}>삭제</DeleteButton>
    </QuizTr>
  );
};

Row.propTypes = propTypes.shape({
  quiz: propTypes.object,
}).isRequired;

export default Row;
