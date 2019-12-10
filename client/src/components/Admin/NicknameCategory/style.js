import styled from 'styled-components';

const NicknameBodyWrapper = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  font-variant-caps: all-small-caps;
  text-align: center;
`;

const NicknameTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid black;
`;

const NicknameThead = styled.thead`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const NicknameTh = styled.th`
  width: 40%;
`;

const NicknameTbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NicknameTr = styled.tr`
  width: 100%;
  display: flex;
`;

const NicknameTd = styled.td`
  width: 40%;
`;

const DeleteButton = styled.button`
  width: fit-content;
  background-color: brown;
`;

const UpdateButton = styled.button`
  width: fit-content;
  background-color: sandybrown;
`;

export {
  NicknameBodyWrapper, NicknameTable, NicknameTh, NicknameTd, NicknameThead, NicknameTr, NicknameTbody, DeleteButton, UpdateButton,
};
