import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalWrapper, ModalContent, ModalButtonWrapper, ModalOkButton, ModalCloseButton,
} from './style';
import Row from './row';
import fetchData from '../../util';

const EditModal = ({ quiz, closeModal }) => {
  const [categoryValue, setCategoryValue] = useState(quiz.category);
  const [levelValue, setLevelValue] = useState(quiz.level);
  const [questionValue, setQuestionValue] = useState(quiz.question);
  const [commentValue, setCommentValue] = useState(quiz.comment);
  const [answerValue, setAnswerValue] = useState(quiz.answer);

  const fetchEditQuiz = () => {
    const quizInfo = {
      id: quiz.id,
      category: categoryValue,
      level: levelValue,
      question: questionValue,
      comment: commentValue,
      answer: answerValue,
    };
    fetchData('put', '/admin/quiz', { id: quiz.id, data: quizInfo });
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
        <ModalOkButton onClick={fetchEditQuiz}>수정</ModalOkButton>
        <ModalCloseButton onClick={closeModal}>취소</ModalCloseButton>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

EditModal.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditModal;
