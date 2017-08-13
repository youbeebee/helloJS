## 들어가기전에
### 실습 환경
* OS : Linux Mint 18.1
* version : Node.js 6.11

### 교재
* Node.js 6.x 블루프린트 - 한빛미디어
* 생활코딩 node.js : <https://opentutorials.org/course/2136>
* 예제 코드 : <https://github.com/newaeonweb/nodejs-6-blueprints>

## NPM 패키지 설치
### yeoman
<http://yeoman.io>

웹 에플리케이션 제너레이터  
~~~
sudo npm install -g yo
~~~

### express generator
<http://expressjs.com/ko>

애플리케이션의 초기화 코드를 생성할 수 있게 도와준다.
~~~
sudo npm install -g express
sudo npm install -g express-generator
~~~

## Ch01. MVC 디자인 패턴을 이용한 트위터 스타일 애플리케이션 만들기
* 사용기술
  * ejs
  * Bootstrap
  * MondoDB

| 컴포넌트 | 설명 | 정보 |
| --- | ---| --- |
| connect-flash | 사용자 친화적인 메시지 출력 | <https://www.npmjs.com/package/connect-flash> |
| connect-mongo | 몽고DB 연결 드라이버 | <https://www.npmjs.com/package/connect-mongo> |
| mongoose | 몽구스 ODM | <https://www.npmjs.com/package/mongoose> |
| express-session | DB에 사용자 세션 저장 | <https://www.npmjs.com/package/express-session> |
| gravatar | 랜덤한 사용자 사진 보여주기 | <https://www.npmjs.com/package/gravatar> |
| bcrypt-nodejs | 패스워드 암호화 모듈 | <https://www.npmjs.com/package/bcrypt-nodejs> |
| passport | 인증 미들웨어 | <https://www.npmjs.com/package/passport> |
| passport-local | 로컬유저/패스워드 인증 | <https://www.npmjs.com/package/passport-local> |

## Ch02. MySQL 데이터베이스를 이용한 기본 웹사이트 만들기
