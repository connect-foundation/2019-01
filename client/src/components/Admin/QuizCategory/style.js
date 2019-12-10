import styled from 'styled-components';

const QuizBodyWrapper = styled.div`
  font-variant-caps: all-small-caps;
  text-align: center;
`;

const QuizTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid black;
`;

const QuizThead = styled.thead`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const QuizTh = styled.th`
  width: 15%;
`;

const QuizTbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const QuizTr = styled.tr`
  width: 100%;
  display: flex;
`;

const QuizTd = styled.td`
  width: 15%;
`;

const CustomButton = styled.button`
  width: fit-content;
  background-color: white
`;

export {
  QuizBodyWrapper, QuizTable, QuizTh, QuizTd, QuizThead, QuizTr, QuizTbody, CustomButton,
};
