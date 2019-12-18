import styled from 'styled-components';

export const ImageBodyWrapper = styled.div`
  font-variant-caps: all-small-caps;
  text-align: center;
`;

export const ImageTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
`;

export const ImageThead = styled.thead`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ImageTh = styled.th`
  width: 20%;
  word-break: break-all;
`;

export const ImageTbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ImageTr = styled.tr`
  width: 100%;
  display: flex;
`;

export const ImageTd = styled.td`
  width: 20%;
`;

export const ImageButton = styled.button`
  width: fit-content;
  height: 20%;
  background-color: white;
`;
