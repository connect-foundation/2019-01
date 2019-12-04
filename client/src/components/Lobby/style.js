import styled from 'styled-components';

const LobbyWrapper = styled.div`
    position: absolute;
    width: 800px;
    height: 620px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(255,255,255,0.2);
    border: 1px solid lightslategrey;
    border-radius: 8px;
    font-size: 30px; 
`;

const LobbyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 15px 20px;
`;

const LobbyBody = styled.div`
    height: 520px;
    padding: 5px 15px;
    box-sizing: border-box;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: dimgray;
    }
`;

const LobbyNickname = styled.div`
    font-size: 36px;
`;

const CreateRoomButton = styled.div`
    text-align: center;
    margin-bottom: 20px;
    padding: 15px;
    border: 2px dashed lightslategrey;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.2);
    cursor: pointer;
`;

const RoomInfoButton = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid lightslategrey;
    border-radius: 8px;
    background-color: ${(props) => (props.enterable ? 'rgba(255,255,255,0.5)' : 'rgba(10,10,10,0.1)')}; ;
    box-shadow: ${(props) => (props.enterable ? '3px 3px 0px dimgrey' : '')};
    color: ${(props) => (props.enterable ? 'black' : 'gray')};
    cursor: ${(props) => (props.enterable ? 'pointer' : 'not-allowed')};
`;

export {
  LobbyWrapper, LobbyHeader, LobbyBody, LobbyNickname, CreateRoomButton, RoomInfoButton,
};
