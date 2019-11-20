CREATE DATABASE IF NOT EXISTS BooleanAvengers;

USE BooleanAvengers;

CREATE TABLE IF NOT EXISTS User (
    github_id VARCHAR(100) NOT NULL,
    nickname VARCHAR(250) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    PRIMARY KEY (github_id)
);

CREATE TABLE IF NOT EXISTS Quiz (
    id int(11) NOT NULL auto_increment,
    category varchar(100) NOT NULL,
    level int(5) NOT NULL,
    question varchar(250) NOT NULL,
    comment text,
    answer boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Nickname_adj (
    id int(11) NOT NULL auto_increment,
    adj varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Nickname_noun (
    id int(11) NOT NULL auto_increment,
    noun varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Image (
    id int(11) NOT NULL auto_increment,
    category varchar(100),
    name varchar(100),
    url varchar(250),
    PRIMARY KEY (id)
);

INSERT INTO
    User
VALUES
    ('ktseo41', '운좋은올빼미', true);

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'html',
        5,
        'canvas element는 그래픽 집약적인 게임에 적합하고 SVG 또한 그렇다.',
        'SVG는 게임에 적합하지 않다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        1,
        'CSS selector에서 id는 hash(#) character로 시작한다.',
        'class는 period(.) character로 시작한다.',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        7,
        'CSS selector A > B를 통해 A의 자식(Child) element들 중 모든 B element를 선택할 수 있다.',
        '또한, A B로 후손(Descendant) element들 중 모든 B element를 선택할 수 있다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        5,
        'CSS selector 우선순위는 !important > * > id > class > tag이다.',
        '!important > id > class > tag > * 이다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        6,
        'async 함수는 항상 Promise를 반환한다.',
        'MDN async_function 참조',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'os',
        5,
        'linux shell command cat 파일이름으로 파일 내용을 볼 수 있다.',
        '',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        9,
        'git은 Distributed Version-Control System 방식의 형상관리 도구이다.',
        '* DVCS 분산 저장소 방식 : Git, Mercurial, Bitkeeper, SVK, Darcs
',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'javascript',
        5,
        'javascript의 창시자는 브랜던 아이쿠(brandon Eichooo)이다.',
        '브랜던 아이크. (Brandon Eich)',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'javascript',
        3,
        'for ... of 반복문으로 객체의 key값에 접근할 수 있다.',
        'for ... in 으로 key 값에 접근할 수 있다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'javascript',
        1,
        'let 변수는 값을 변경할 수 없다.',
        'const가 변경할 수 없다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'web',
        2,
        'WWW는 Word Wide Web을 의미한다.',
        'World Wide Web이다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'web',
        9,
        '최초의 웹 브라우저는 NeXT Computer 시스템에서 구동되었다',
        '잡스짱',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'web',
        5,
        'URL은 Uniform Resource Locator의 약자이다.',
        '',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'javascript',
        8,
        'node.js는 구글 크롬의 v8 엔진으로 구성된 Javascript 런타임이다. ',
        '',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'javascript',
        2,
        'Javascript에서 Array의 모든 요소는 동일한 type으로 이루어져야 한다.',
        'Javascript는 Array는 Object에서 추가로 특정 method를 가지는 객체이기 때문에, 배열의 모든 요소가 다른 타입이여도 상관없다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        4,
        'CSS 속성 중 z-index는 Element의 CSS position 값에 상관없이 항상 적용된다.',
        'position 값이 static이 아닌 element에만 적용된다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        5,
        'CSS 속성 중 position 의 기본값은 relative이다.',
        '기본값은 static이다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'css',
        5,
        'CSS의 media query는 CSS3에서 도입되었다.',
        '',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'database',
        3,
        'SQL언어의 데이터 정의어(DDL)는 CREATE, SELECT, DROP이 있다.',
        'SQL언어의 데이터 정의어(DDL)는 CREATE, ARTER, DROP이 있다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'os',
        5,
        'UNIX에서 사용자에 대한 파일의 접근을 제한하는데 사용되는 명령어는 tar이다.',
        'UNIX에서 사용자에 대한 파일의 접근을 제한하는데 사용되는 명령어는 chmod이다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'javascript',
        3,
        '자바 스크립트의 == 연산자는 피연산자들의 value가 같은지만 확인하고, === 연산자는 value와 type이 같은지 확인한다.',
        '',
        true
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'database',
        6,
        '일련의 연산 집합으로 데이터베이스의 상태를 변환시키기 위하여 논리적 기능을 수행하는 하나의 작업 단위는 프로시저이다.',
        '일련의 연산 집합으로 데이터베이스의 상태를 변환시키기 위하여 논리적 기능을 수행하는 하나의 작업 단위는 트랜잭션이다.',
        false
    );

INSERT INTO
    Quiz (
        category,
        level,
        question,
        comment,
        answer
    )
VALUES
    (
        'os',
        7,
        '데이터 프레임의 정확한 수신 여부를 매번 확인하면서 다음 프레임을 전송해 나가는 ARQ 방식은 Go-back-N ARQ이다.',
        '데이터 프레임의 정확한 수신 여부를 매번 확인하면서 다음 프레임을 전송해 나가는 ARQ 방식은 Stop-and-Wait ARQ이다.',
        false
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'background',
        'background-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/background-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'logo',
        'github-logo',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/github_logo.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'game',
        'field',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/field.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'game',
        'dashboard',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'antman-big',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/antman-big.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'blackpanther-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/blackpanther-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'captainamerica-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/captainamerica-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'captainmarvel-shorthair',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/captainmarvel-shorthair.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'deadpool-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/deadpool-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'doctorstrange',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/doctorstrange.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'ghostrider',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/ghostrider.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'groot-adult',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/groot-adult.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'ironman-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/ironman-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'mysterio',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/mysterio.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'nebula',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/nebula.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'nickfury',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/nickfury.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'rocketraccoon',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/rocketraccoon.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'spiderman-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/spiderman-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'spiderman-nightmonkey',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/spiderman-nightmonkey.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'thanos-main',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/thanos-main.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'thor-longhair',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/thor-longhair.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'wintersoldier',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/wintersoldier.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'wolverine',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/wolverine.png'
    );

INSERT INTO
    Image (category, name, url)
VALUES
    (
        'character',
        'yondu',
        'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/yondu.png'
    );