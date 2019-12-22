<h1 align="center">Welcome to Boolean Avengers 👋</h1>
<p>
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
    <img alt="node-version" src="https://img.shields.io/badge/node-10.16.0-blue.svg" />
    <img alt="npm-version" src="https://img.shields.io/badge/npm-6.9.0-blue.svg" />
    <a href="https://github.com/connect-foundation/2019-01/wiki" target="_blank">
        <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
    </a>
    <a href="https://github.com/connect-foundation/2019-01/issues">
        <img alt="Issues" src="https://img.shields.io/github/issues/connect-foundation/2019-01"/>
    </a>
    <a href="https://github.com/connect-foundation/2019-01/pulls">
        <img alt="Pull requests" src="https://img.shields.io/github/issues-pr/connect-foundation/2019-01"/>
    </a>
    <a href="https://travis-ci.org/connect-foundation/2019-01" target="_blank">
        <img alt="Travis" src="https://travis-ci.org/connect-foundation/2019-01.svg?branch=master">
    </a>
    <a href="https://github.com/connect-foundation/2019-01/blob/master/LICENSE" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

<p align="center"><img width="500" height="312" src="https://i.imgur.com/qAtbtqw.png"></p>

### 📖 [Wiki](https://github.com/connect-foundation/2019-01/wiki)
### 🖥 [Demo Video](https://www.youtube.com/watch?v=ByhvS6dEXKk)
### 🕹️ [Click and Play game!](https://boolean-avengers.dev)
> #### 개발자를 위한 OX 퀴즈 게임 서비스
> 끝까지 살아남는 자가 채용된다!
식상한 퀴즈게임과 지루한 개발 공부에 질리셨나요?
키보드로 직접 캐릭터를 조작해서 개발 상식 OX 퀴즈를 풀어보세요!
Boolean Avengers는 다이내믹한 게임 요소와 개발 상식 퀴즈를 결합한 웹 시리어스 게임 서비스입니다.

## Install & Run
- 😘Front-End
```sh
cd client
npm install
npm start
```
- 🏗Back-End
```sh
cd server
npm install
npm start
```
- 🐳By Docker-compose
```sh
docker-compose up
```

## ⛑Run tests

```sh
npm test
```

## 🏁 Challenge
**웹에서 즐기는 다이내믹한 게임!**
- 웹 환경에서 유저들이 여러 상호작용을 할 수 있는 게임 서비스를 제공합니다.
- 여러 유저들의 행동을 실시간으로 반영하면서, 유저들에게 동일한 UX를 제공합니다.
- 웹에서 보다 부드러운 애니메이션을 통해 매끄러운 게임 환경을 제공합니다.
- 유저들간의 상호작용을 유도하여, 다이내믹한 게임 요소들을 제공합니다.
## :ledger: Tech Log
- [1주차 - 서비스 기획 + 개발 세팅 + 브랜치 전략](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#1주차---서비스-기획--개발-세팅--브랜치-전략)
- [2주차 - 인프라 + 개발환경 설정(husky + ESLint)](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#2주차---인프라--개발환경-설정husky--ESLint)
- [3주차 - 캐릭터 애니메이션 + 실시간 움직임 표시](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#3주차---캐릭터-애니메이션--실시간-움직임-표시)
- [4주차 - 게임 예외상황 + socket test + 소켓 재연결 이슈](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#4주차---게임-예외상황--socket-test--소켓-재연결-이슈)
- [5주차 - 캐릭터 움직임 버그 + OAuth 로그인](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#5주차---캐릭터-움직임-버그--OAuth-로그인)
- [6주차 - 사운드 + 도메인 + 엄격한 채팅 길이 검사 + 애니메이션 추가](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#6주차---사운드--도메인--엄격한-채팅-길이-검사-+-애니메이션-추가)
- [7주차 - 리팩토링](https://github.com/connect-foundation/2019-01/wiki/Project-Tech-Log#7주차---리팩토링)

## 🔧 Tech Stack
![](https://i.imgur.com/YtStqB6.png)

## 🗃 Project Folder
```
📁docker
📁mysql
📁script
📁client
├── 📁public
├── 📁src
│   ├── App
│   ├── 📁modules
│   ├── 📁constants
│   └── 📁components
│       ├── 📁Admin
│       ├── 📁Login
│       ├── 📁Lobby
│       └── 📁Room
│       └── 📁OAuth
📁server
├── App
├── 📁bin
│   └── www
├── 📁middlewares
├── 📁routes
│   └── 📁admin
├── 📁database
├── 📁controller
├── 📁models
├── 📁constants
├── 📁test
└── 📁util
```

## 🏗 Architecture
### Server & Client
<p align="center"><img alt="Server&Client" width="650" height="520" src="https://i.imgur.com/bt9mdJ1.png"></p>

### CI/CD
<p align="center"><img alt="CI/CD" src="https://i.imgur.com/3mDQDlP.png"></p>

### Socket event flow
<p align="center"><img alt="Socket event flow" width="700" height="480" src="https://i.imgur.com/SIYguR1.png"></p>

### Game Logic
#### Move
<p align="center"><img alt="Game Logic: Move" src="https://i.imgur.com/4ReXZ9y.png"></p>

#### Game start to end
<p align="center"><img alt="Game Logic: Start&End" src="https://i.imgur.com/XOAeYzi.png"></p>

## 👨‍👩‍👦‍👦 Author

👤 **boostcamp 2019-01**
> 👸 [김희선](https://github.com/bellaah)<br />
> 🌟 [함형규](https://github.com/gyustar)<br />
> 🤐 [서보현](https://github.com/ktseo41)👨‍⚕️<br />
> 💑 [조영도](https://github.com/young-do)

## 📝 Copyright
#### Character Image
Allowed use and edit only for non-commercial from [Source](https://forums.rpgmakerweb.com/index.php?threads/marvel-characters-sets-sv-battlers-avengers-spider-man-x-men-more.101244/)

#### Sound
Allowed use only for non-commercial from [Source](https://www.bensound.com/royalty-free-music)

## 🤝 Contributing
Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/connect-foundation/2019-01/issues).

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
