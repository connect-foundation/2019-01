import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  QuizTh, QuizTr, CustomButton,
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

  const updateQuiz = (e) => {
    console.log(e);
    // setQuiz((currentInfo) => {...currentInfo, e});
  };

  return (
    <QuizTr>
      {keys.map((key) => <QuizTh onChange={updateQuiz}>{quiz[key]}</QuizTh>)}
      <CustomButton onClick={() => updateButtonHandler(quiz.id)}>수정</CustomButton>
      <CustomButton onClick={() => deleteButtonHandler(quiz.id)}>삭제</CustomButton>
    </QuizTr>
  );
};

Row.propTypes = PropTypes.shape({
  quiz: PropTypes.object,
}).isRequired;

export default Row;
