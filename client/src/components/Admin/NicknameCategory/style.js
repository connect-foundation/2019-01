import styled from 'styled-components';

export const NicknameBodyWrapper = styled.div`
  display: flex;
  font-variant-caps: all-small-caps;
  text-align: center;
`;

export const NicknameTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid black;
`;

export const NicknameThead = styled.thead`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const NicknameTh = styled.th`
  width: 40%;
`;

export const NicknameTbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const NicknameTr = styled.tr`
  width: 100%;
  display: flex;
`;

export const NicknameTd = styled.td`
  width: 40%;
`;

export const NicknameButton = styled.button`
  width: fit-content;
  background-color: white;
`;

export const NicknameInput = styled.input.attrs({
  type: 'text',
})`
  width: fit-content;
`;
