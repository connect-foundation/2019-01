## 설계 관련 질문
- 이번주에는 설계, 환경 설정을 하느라 socket만 연결하고 코드 작성을 하지 못했습니다.  그렇기에 설계에 관련된 질문을 하고 싶습니다!

### 프로젝트 구조
```
.
├── client
│   ├── public
│   │   └── images
│   └── src
│       ├── component
│       ├── action
│       ├── reducer
│       └── store
└── server
    ├── app.js
    ├── bin
    ├── database
    ├── middlewares
    ├── event
    ├── models
    ├── routes
    └── util
```
- 저희 팀은 mvc 패턴을 사용하려고 했습니다. 하지만 react를 사용하며 mvc패턴을 어떻게 적용하면 좋을지 고민해봤습니다. 그렇게 알아보니 react에서는 mvc패턴의 복잡성을 해결하고자 flux의 구현체인 redux를 사용한다고 하여 redux을 사용하려고 합니다. 
- redux를 사용할 때, 위와 같이 client 구조를 잡았는데 이런 구조로 프로젝트를 진행하는 것이 괜찮을까요?