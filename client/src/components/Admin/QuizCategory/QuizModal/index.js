import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalWrapper, ModalContent, ModalButtonWrapper, ModalOkButton, ModalCloseButton,
} from './style';
import Row from './row';

const QuizModal = ({ quiz, closeModal, fetchData }) => {
  const [categoryValue, setCategoryValue] = useState(quiz.category);
  const [levelValue, setLevelValue] = useState(quiz.level);
  const [questionValue, setQuestionValue] = useState(quiz.question);
  const [commentValue, setCommentValue] = useState(quiz.comment);
  const [answerValue, setAnswerValue] = useState(quiz.answer);

  const fetchQuiz = () => {
    const quizInfo = {
      id: quiz.id,
      category: categoryValue,
      level: levelValue,
      question: questionValue,
      comment: commentValue,
      answer: answerValue,
    };

    fetchData(quizInfo);
    closeModal();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <Row
          category="category"
          value={categoryValue}
          changeValue={(e) => setCategoryValue(e.target.value)} />
        <Row
          category="level"
          value={levelValue}
          changeValue={(e) => setLevelValue(e.target.value)} />
        <Row
          category="question"
          value={questionValue}
          changeValue={(e) => setQuestionValue(e.target.value)} />
        <Row
          category="comment"
          value={commentValue}
          changeValue={(e) => setCommentValue(e.target.value)} />
        <Row
          category="answer"
          value={answerValue}
          changeValue={(e) => setAnswerValue(e.target.value)} />
      </ModalContent>
      <ModalButtonWrapper>
        <ModalOkButton onClick={fetchQuiz}>확인</ModalOkButton>
        <ModalCloseButton onClick={closeModal}>취소</ModalCloseButton>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

QuizModal.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default QuizModal;
