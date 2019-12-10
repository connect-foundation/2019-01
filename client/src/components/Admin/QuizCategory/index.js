import React, { useState, useEffect } from 'react';
import {
  QuizBodyWrapper, QuizTable, QuizTh, QuizThead, QuizTr, QuizTbody, QuizButton,
} from './style';
import fetchData from '../util';
import Row from './Row';
import QuizModal from './QuizModal';

const QuizCategory = () => {
  const [quizData, setQuizData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [fetchQuiz, setFetchQuiz] = useState(null);

  const openEditModal = (quiz) => () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        const fetchEditData = (quizInfo) => {
          fetchData('put', '/admin/quiz', { id: quizInfo.id, data: quizInfo });
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
          fetchData('post', '/admin/quiz', quizInfo);
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
