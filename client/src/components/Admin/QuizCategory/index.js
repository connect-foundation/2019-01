import React, { useState, useEffect } from 'react';
import {
  QuizBodyWrapper, QuizTable, QuizTh, QuizTd, QuizThead, QuizTr, QuizTbody, DeleteButton, UpdateButton,
} from './style';
import URL from '../../../constants/url';

const QuizCategory = () => {
  const [quizData, setQuizData] = useState('');

  const deleteButtonHandler = (quizId) => {
    fetch('');
  };

  const updateButtonHandler = (quizId) => {
    fetch('');
  };

  const makeNewRow = (quizList) => {
    const quizTagList = () => quizList.map((quiz) => (
      <QuizTr>
        <QuizTh>{quiz.id}</QuizTh>
        <QuizTd>{quiz.category}</QuizTd>
        <QuizTd>{quiz.level}</QuizTd>
        <QuizTd>{quiz.question}</QuizTd>
        <QuizTd>{quiz.comment}</QuizTd>
        <QuizTd>{quiz.answer}</QuizTd>
        <DeleteButton onClick={() => deleteButtonHandler(quiz.id)}>X</DeleteButton>
        <UpdateButton onClick={() => updateButtonHandler(quiz.id)}>update</UpdateButton>
      </QuizTr>
    ));
    setQuizData(quizTagList);
  };

  useEffect(() => {
    // const QuizList = fetch(`${URL.LOCAL_API_SERVER}`);
    // makeNewRow(QuizList);
    const testList = [{
      id: 'a', category: 'b', level: 3, question: 'aa', comment: 'bb', answer: 'O',
    }];
    makeNewRow(testList);
  }, []);

  return (
    <QuizBodyWrapper>
      <QuizTable>
        <QuizThead>
          <QuizTd>id</QuizTd>
          <QuizTd>category</QuizTd>
          <QuizTd>level</QuizTd>
          <QuizTd>quistion</QuizTd>
          <QuizTd>comment</QuizTd>
          <QuizTd>answer</QuizTd>
        </QuizThead>
        <QuizTbody>
          {quizData}
        </QuizTbody>
      </QuizTable>
    </QuizBodyWrapper>
  );
};

export default QuizCategory;
