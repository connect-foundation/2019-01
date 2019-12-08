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

  const makeRows = (quizList) => {
    const quizTagList = () => quizList.map((quiz) => {
      const keys = Object.keys(quiz);
      return (
        <QuizTr>
          {keys.map((key) => <QuizTd>{quiz[key]}</QuizTd>)}
          <UpdateButton onClick={() => updateButtonHandler(quiz.id)}>update</UpdateButton>
          <DeleteButton onClick={() => deleteButtonHandler(quiz.id)}>X</DeleteButton>
        </QuizTr>
      );
    });
    setQuizData(quizTagList);
  };

  useEffect(() => {
    // const QuizList = fetch(`${URL.LOCAL_API_SERVER}`);
    // makeNewRow(QuizList);
    const testList = [{
      id: 'a', category: 'b', level: 3, question: 'aa', comment: 'bb', answer: 'O',
    }];
    makeRows(testList);
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
