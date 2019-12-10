import React, { useState, useEffect } from 'react';
import {
  QuizBodyWrapper, QuizTable, QuizTh, QuizThead, QuizTr, QuizTbody,
} from './style';
import fetchData from '../util';
import Row from './Row';
import EditModal from './EditModal';

const QuizCategory = () => {
  const [quizData, setQuizData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openEditModal = (quiz) => () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        setModalContent(quiz);
      }
      return true;
    });
  };

  const closeEditModal = () => setIsModalOpen(false);

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
        <QuizTbody>{quizData}</QuizTbody>
      </QuizTable>
      {isModalOpen ? <EditModal quiz={modalContent} closeModal={closeEditModal} /> : ''}
    </QuizBodyWrapper>
  );
};

export default QuizCategory;
