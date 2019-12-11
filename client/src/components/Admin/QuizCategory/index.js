import React, { useState, useEffect } from 'react';
import {
  QuizBodyWrapper, QuizTable, QuizTh, QuizThead, QuizTr, QuizTbody, QuizButton,
} from './style';
import fetchData from '../util';
import Row from './Row';
import QuizModal from './QuizModal';
import URL from '../../../constants/url';

const QuizCategory = () => {
  const [quizData, setQuizData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [fetchQuiz, setFetchQuiz] = useState(null);

  const openEditModal = (quiz) => () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        const fetchEditData = (quizInfo) => {
          fetchData('put', URL.ADMIN.QUIZ, { id: quizInfo.id, data: quizInfo });
        };
        setFetchQuiz(() => fetchEditData);
        setModalContent(quiz);
      }
      return true;
    });
  };

  const openAddModal = () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        const fetchAddData = (quizInfo) => {
          fetchData('post', URL.ADMIN.QUIZ, quizInfo);
        };
        setFetchQuiz(() => fetchAddData);
        setModalContent({
          id: 'id',
          category: 'category',
          level: 'level',
          question: 'question',
          comment: 'comment',
          answer: 'answer',
        });
      }
      return true;
    });
  };

  const closeModal = () => setIsModalOpen(false);

  const makeNewRow = (quizList) => {
    setQuizData(() => quizList.map(
      (quiz) => {
        const openModal = openEditModal(quiz);
        return <Row openModal={openModal} quiz={quiz} />;
      },
    ));
  };

  useEffect(() => {
    fetchData('get', URL.ADMIN.QUIZ_LIST)
      .then((res) => makeNewRow(res.quizList));
  }, []);

  return (
    <QuizBodyWrapper>
      <QuizTable>
        <QuizThead>
          <QuizTr>
            <QuizTh>id</QuizTh>
            <QuizTh>category</QuizTh>
            <QuizTh>level</QuizTh>
            <QuizTh>quistion</QuizTh>
            <QuizTh>comment</QuizTh>
            <QuizTh>answer</QuizTh>
          </QuizTr>
        </QuizThead>
        <QuizTbody>
          <QuizTr>
            <QuizButton onClick={openAddModal}>추가</QuizButton>
          </QuizTr>
          {quizData}
        </QuizTbody>
      </QuizTable>
      {isModalOpen ? <QuizModal quiz={modalContent} closeModal={closeModal} fetchData={fetchQuiz} /> : ''}
    </QuizBodyWrapper>
  );
};

export default QuizCategory;
