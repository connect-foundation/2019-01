import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 30%;
  left: 40%;
  transform: -30% -40%;
  width: 30rem;
  height: 20rem;
  background-color: white;
  border: 1px solid black;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 70%;
`;

export const ModalContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15%;
`;

export const ModalContentCategory = styled.div`
  width: 20%;
`;

export const ModalContentValue = styled.input`
  width: 75%;
`;

export const ModalButtonWrapper = styled.div`
  width: 30%;
  height: 10%;
  display: flex;
  justify-content: space-between;
`;

const buttonStyle = `
  :hover {
    cursor: pointer;
  }
  width: 30%;
  height: fit-content;
  outline: 0;
  border: 0;
`;

export const ModalOkButton = styled.div`
  ${buttonStyle}
  background-color: sandybrown;
`;

export const ModalCloseButton = styled.div`
  ${buttonStyle}
  background-color: brown;
`;
