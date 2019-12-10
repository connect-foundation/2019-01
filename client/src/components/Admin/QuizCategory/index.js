import React, { useState, useEffect } from 'react';
import {
  QuizBodyWrapper, QuizTable, QuizTh, QuizThead, QuizTr, QuizTbody,
} from './style';
import fetchData from '../util';
import Row from './Row';

const QuizCategory = () => {
  const [quizData, setQuizData] = useState('');

  const makeNewRow = (quizList) => {
    const quizTagList = () => quizList.map((quiz) => <Row quiz={quiz} />);
    setQuizData(quizTagList);
  };

  useEffect(() => {
    fetchData('get', '/admin/quiz/list')
      .then((res) => makeNewRow(res.quizList));
  }, []);

  return (
    <QuizBodyWrapper>
      <QuizTable>
        <QuizThead>
          <QuizTr>
            <QuizTh><p>id</p></QuizTh>
            <QuizTh><p>category</p></QuizTh>
            <QuizTh><p>level</p></QuizTh>
            <QuizTh><p>quistion</p></QuizTh>
            <QuizTh><p>comment</p></QuizTh>
            <QuizTh><p>answer</p></QuizTh>
          </QuizTr>
        </QuizThead>
        <QuizTbody>{quizData}</QuizTbody>
      </QuizTable>
    </QuizBodyWrapper>
  );
};

export default QuizCategory;
