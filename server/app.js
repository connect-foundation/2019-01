//app.js에서 socket.io를 사용한 일부분만 가져왔습니다.

/**
* bin/www
* ```
* app.io.attach(server);
* ```
*/

import socketIo from 'socket.io';
app.io = socketIo();

app.io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('init', (data) => {
      console.log(data.name);
      socket.emit('welcome', `hello! ${data.name}`);
    });
});


/**
* 질문1 :
* 위와 같이 socket client가 연결되면 ‘connection’ event가 발생하고 callback함수가 실행될 것입니다.
* parameter로 socket이 들어와서 그 socket을 on할 수 있게 ‘connection’ 안 callback함수에 정의를 했는데요.
* 이것을 다른 폴더에서 socket.on 혹은 app.io.on 이런식으로 socket.io와 관련한 부분만 분리할 수 있을까요?
*/