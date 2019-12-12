import styled from 'styled-components';

export const UserBodyWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-variant-caps: all-small-caps;
  text-align: center;
`;

export const UserTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid black;
`;

export const UserThead = styled.thead`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const UserTh = styled.th`
  width: 40%;
`;

export const UserTbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserTr = styled.tr`
  width: 100%;
  display: flex;
`;

export const UserInput = styled.input`
  align-self: center;
`;

export const UserTd = styled.td`
  width: 40%;
`;

export const CustomButton = styled.button`
  width: fit-content;
  background-color: white;
`;
