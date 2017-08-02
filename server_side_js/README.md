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
