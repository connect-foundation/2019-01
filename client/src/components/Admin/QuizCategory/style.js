import styled from 'styled-components';

const QuizBodyWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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

const buttonStyle = `
  :hover {
    cursor: pointer;
  }
  width: fit-content;
  height: fit-content;
  outline: 0;
  border: 0;
`;

const DeleteButton = styled.button`
  ${buttonStyle}
  background-color: brown;
`;

const UpdateButton = styled.button`
  ${buttonStyle}
  background-color: sandybrown;
`;

export {
  QuizBodyWrapper, QuizTable, QuizTh, QuizTd, QuizThead, QuizTr, QuizTbody, DeleteButton, UpdateButton,
};
