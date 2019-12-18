import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { QuizModalWrapper, QuizModalButtonWrapper } from '../../style';

const QuizModal = ({
  quiz, open, closeModal, fetchData,
}) => {
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
    <Modal open={open}>
      <QuizModalWrapper>
        <TextField
          label="category"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)} />
        <TextField
          label="level"
          value={levelValue}
          onChange={(e) => setLevelValue(e.target.value)} />
        <TextField
          label="question"
          value={questionValue}
          onChange={(e) => setQuestionValue(e.target.value)} />
        <TextField
          label="comment"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)} />
        <TextField
          label="answer"
          value={answerValue}
          onChange={(e) => setAnswerValue(e.target.value)} />
        <QuizModalButtonWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchQuiz}>
          확인
          </Button>
          <Button
            variant="contained"
            onClick={closeModal}>
          취소
          </Button>
        </QuizModalButtonWrapper>
      </QuizModalWrapper>
    </Modal>
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
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default QuizModal;
