import styled from 'styled-components';

export const QuizBodyWrapper = styled.div`
  font-variant-caps: all-small-caps;
  text-align: center;
`;

export const QuizTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
`;

export const QuizThead = styled.thead`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const QuizTh = styled.th`
  width: 15%;
`;

export const QuizTbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const QuizTr = styled.tr`
  width: 100%;
  display: flex;
`;

export const QuizTd = styled.td`
  width: 15%;
`;

export const QuizButton = styled.button`
  width: fit-content;
  background-color: white
`;
