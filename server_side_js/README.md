## 실습 환경
* OS : Linux Mint 18.1
* version : Node.js 6.11

## 교재
* 생활코딩 node.js : <https://opentutorials.org/course/2136>

## Node.js 설치
Node.js 홈페이지(<https://nodejs.org/ko/>)에서 리눅스용 설치 cmd 확인

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs

    //제대로 설치되었나 확인
    node --version

## 실행
    node [파일명]

### 소스코드가 변경되었을 때 자동으로 node 재실행하기
supervisor 모듈을 사용

    //설치
    sudo npm install supervisor -g
    //supervisor로 실행
    supervisor app.js

## NPM
Node Package Manager의 약자. Node의 모듈을 모아놓은 시스템.

<http://npmjs.com>

    //npm 패키지 만들기
    npm init

    //모듈 설치 (g: 전역으로 설치, save: dependency에 포함)
    npm install 모듈명 [-g] [--save]

## Express.js
Node.js로 만든 프레임워크

<http://expressjs.com/ko>

    //Express 설치
    npm install express --save

## Jade
Express에서 권장하는 템플릿 엔진. 쉽게 html코드를 만들 수 있는 생성기

    //Jade 설치
    npm install jade --save
    //Express에서 사용
    app.set('view engine', 'jade');
    app.set('views', './views'); //jade 파일을 넣을 디렉토리. 생략해도 views를 기본값으로 한다.

## URL을 이용한 정보의 전달

http://a.com/topic?id=1

[프로토콜]://[domain]/[path]?[query string]&[query string2]

### Semantic URL
URL을 의미적으로 보기 쉬운 방식으로 나타내줌(Restful api 참고)
* Non-semantic URL : [url]?page=1&line=10
* Semantic URL     : [url]/page/1/10

사용법

    app.get('/topic/:id/:mode', (req, res) => {\
        res.send(req.params.id+','+req.params.mode)\
    });

## GET vs POST
get : query string으로 전달, 길이 제한 존재
post : url상으로 드러나지 않음(헤더에 포함됨), 길이 제한 없음

post 방식을 처리하려면 body parser 모듈 설치 필요

    npm install body-parser --save

## 파일 업로드
express는 기본적으로 파일 업로드 기능을 지원하지 않으므로 multer 패키지를 설치한다.

    npm install multer --save

## DB
### MySQL
대표적인 오픈소스 관계형 데이터베이스. 웹앱 제작의 APM(Apache, PHP, MySQL) 중 하나.

    //리눅스에서 설치(버전은 적당히)
    sudo apt-get install mysql-server-5.7 mysql-client-5.7
    //설치 확인
    mysql -uroot -p

    //DB 확인
    mysql>show databases;
    //DB 생성
    mysql>CREATE DATABASE db_name CHARACTER SET utf8 COLLATE utf8_general_ci;
    //DB 선택
    mysql>use db_name;
    //테이블 생성
    CREATE TABLE `topic` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(100) NOT NULL,
        `desc` text NOT NULL,
        `author` varchar(30) NOT NULL,
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    //테이블 확인
    mysql>show tables;
    //데이터 삽입
    INSERT INTO topic (title, desc, author) VALUES('JS','description', 'me');

### MySQL with Node
JavaScript로 MySQL을 제어하는 법

    //node-mysql 모듈 설치
    npm install --save node-mysql

    //사용법
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'password',
        database : 'db_name'
    }); //실제로는 다른 파일로 빼고 버전관리, 공유에서 제외시켜야
    conn.connect();
    var SQL = 'INSERT INTO topic ('title', 'desc', 'author') VALUES(?, ?, ?)';
    var params = ['titles', 'description', 'me']; //변수 처리법
    conn.query(SQL, params, (err, rows, fields) => {
        //callback
    });
    conn.end();

## Cookie
http는 상태가 없는 프로토콜. 이를 보완하기 위해 웹사이트에 접속할 때 상태를 저장할 수 있도록 넷스케이프에서 구현한 기술. 세션, 인증 등에도 사용된다.  
express는 기본적으로 쿠키 기능을 가지고 있지 않기 때문에 모듈을 설치해야 한다.

    npm install cookie-parser --save

### 쿠키의 보안
쿠키는 평문으로 전송하면 탈취 등에 취약하므로 https를 설정하거나 key를 통해 암호화해야한다.  
단, 암호화를 하더라도 로그인 정보를 쿠키에 저장하는 것을 취약하므로 session을 사용해야 한다.

## Session
웹브라우저와 서버가 공유하는 사용자의 식별자. 값이 같으면 같은 사용자로 간주할 수 있다.  
세션id 자체는 의미있는 값이 아니고 사용자의 컴퓨터에 쿠키가 저장되지 않기 때문에 더 안전하다.  
express에 세션 기능을 추가하기 위해서는 패키지 설치가 필요하다.

    npm install express-session --save

express의 세션은 기본적으로 서버의 메모리에 저장되어 있기 때문에 재시작하면 초기화된다.  
따라서 DB 등에 저장하는 것이 필요하다.

### Session store to file

    npm install session-file-store --save

### Session store to MySQL

    npm install express-mysql-session --save
