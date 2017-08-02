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