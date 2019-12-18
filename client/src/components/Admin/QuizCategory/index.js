import React, { useState, useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import CustomSnackbar from '../CustomSnackbar';
import { fetchData } from '../../../util';
import QuizRow from './Row';
import QuizModal from './QuizModal';
import URL from '../../../constants/url';
import ADMIN from '../../../constants/admin';

const QuizCategory = () => {
  const [quizData, setQuizData] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [fetchResult, setFetchResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [fetchQuiz, setFetchQuiz] = useState(null);
  const timerId = useRef(null);

  const openSnackbar = (result) => {
    setIsSnackbarOpen(true);
    setFetchResult(result);
    timerId.current = setTimeout(() => setIsSnackbarOpen(false), ADMIN.SNACKBAR_TIME_MS);
  };

  const openEditModal = (quiz) => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        const fetchEditData = (quizInfo) => {
          fetchData('put', URL.ADMIN.QUIZ, { id: quizInfo.id, data: quizInfo })
            .then(({ result }) => openSnackbar(result));
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
          fetchData('post', URL.ADMIN.QUIZ, quizInfo)
            .then(({ result }) => openSnackbar(result));
        };
        setFetchQuiz(() => fetchAddData);
        setModalContent({
          id: 0,
          category: '',
          level: 1,
          question: '',
          comment: '',
          answer: 0,
        });
      }
      return true;
    });
  };

  const closeModal = () => setIsModalOpen(false);

  const makeNewRow = (quizList) => {
    setQuizData(() => quizList.map(
      (quiz) => (
        <QuizRow
          key={quiz.id}
          openModal={openEditModal}
          quiz={quiz}
          openSnackbar={openSnackbar} />
      ),
    ));
  };

  useEffect(() => {
    fetchData('get', URL.ADMIN.QUIZ_LIST)
      .then((res) => makeNewRow(res.quizList));

    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={openAddModal}>
              추가
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{quizData}</TableBody>
      </Table>
      <CustomSnackbar open={isSnackbarOpen} result={fetchResult} />
      {isModalOpen ? (
        <QuizModal
          quiz={modalContent}
          open={isModalOpen}
          closeModal={closeModal}
          fetchData={fetchQuiz} />
      ) : ''}
    </>
  );
};

export default QuizCategory;
