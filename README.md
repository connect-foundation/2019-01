# 2019-01

- 서비스 간단 설명: 웹 퀴즈 게임 서비스입니다. 로비가 있고, 게임 룸이 n개로 있고, 퀴즈를 받아오는 게임 로직이 있습니다. 게임 룸에는 여러 유저들이 socket.io를 사용해 접속합니다.

- 방시스템 로직과 게임 로직, 소켓 통신을 사용한 서비스 진행 로직. 이렇게 세 가지를 캡슐화하고 의존도를 줄이기 위한 목적을 가지고 객체를 설계했습니다. 각 역할만 간단히 정리했는데, 괜찮은 방법인지 조언해주시면 감사하겠습니다 :)

#### 백엔드에서의 객체 입니다.
#### controller
- 소켓을 사용해서 서비스 진행
- <room,player,lobby model>과 <game model>에 의존해서 해당 모델의 로직을 사용한다.
- 소켓 통신은 controller에서만 사용한다.

#### game model
- db에서 퀴즈를 받아와서 controller에게 문제와 답을 제공

#### room, player, lobby model
- player: 해당 플레이어의 정보를 room 또는 lobby에 제공
- room: player에 의존. lobby에 해당 룸의 정보를 제공
- lobby: player, room에 의존