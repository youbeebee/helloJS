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
`<% include %>`태그로 애플리케이션에 포함시킨다.