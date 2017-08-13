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
제너레이터로 프로젝트 시작에 필요한 구조 생성
~~~
express --ejs --css sass --git
//Jade 대신 EJS 엔진을 사용
//CSS에 SASS 사용
//.gitingore 파일을 프로젝트에 추가
~~~
package.json에 나열된 필수 dependency 설치
~~~
npm install
~~~

### 애플리케이션 실행하기
~~~
DEBUG=ch01:* npm start
~~~
`npm start`와 `node app.js`와의 차이점 : npm start는 package.json의 start 스크립트를 실행한다. 현 프로젝트는 `node ./bin/www`가 실행되도록 설정되어 있다.

### ejs
<http://ejs.co/>  
뷰 템플릿 엔진의 하나. 임베디드 자바스크립트의 약자.  
이러한 리소스를 부분partitial 파일이라고 하며 `<% include %>`태그로 애플리케이션에 포함시킨다.

### Twitter Bootstrap
<http://getbootstrap.com/>  
v3.2 한글 설명 : <http://bootstrapk.com/>  
트위터에서 만든 UI 툴킷이며 CSS 프레임워크. 반응형 웹, 크로스 브라우징을 지원한다.

기본적으로 화면의 width를 12등분하여 화면의 크기에 따라 레이아웃을 어떻게 표현할지 분류한다.

| . | Extra small devices<br>(<768px) | Small devices<br>(≥768px) | Medium devices<br>(≥992px) | Large devices<br>(≥1200px) |
| --- | --- | --- | --- | --- |
| Grid behavior | Horizontal at all times | Collapsed to start, horizontal above breakpoints |||
| # of columns | 12 ||||
| Class prefix | .col-xs- | .col-sm- | .col-md- | .col-lg-

### MongoDB
<https://docs.mongodb.com/manual/installation/>  
오픈소스 NoSQL 데이터베이스

몽고DB 3.4 설치
~~~
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
~~~

버전 확인
~~~
mongod -version
~~~

시작/재시작/정지
~~~
service mongod start
service mongod restart
service mongod stop
~~~

### 기타 미들웨어 설치
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

~~~shell
npm install connect-flash connect-mongo mongoose express-session gravatar bcrypt-nodejs passport passport-local --save
~~~