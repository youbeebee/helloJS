# Ch02. MySQL 데이터베이스를 이용한 기본 웹사이트 만들기
## 시작
기초 애플리케이션 생성
~~~
express --git
~~~
실행
~~~
DEBUG=ch02:* npm start
~~~

## MySQL
<https://dev.mysql.com/downloads/>  

설치 명령어
~~~
sudo apt-get install mysql-server-5.7 mysql-client-5.7
~~~

설치 확인(root로 cmd 열기)
~~~
mysql -uroot -p
~~~

## 스위그 템플릿 엔진
<https://github.com/paularmstrong/swig>  
앵귤러JS와 유사한 문법을 제공하는 템플릿 엔진

`package.json`을 열고 jade 부분을 다음 코드로 교체
~~~
"swig": "^1.4.2",
~~~
터미널에서 dependency 설치
~~~
npm install
~~~

## sequelize-cli
모델 생성, DB 파일의 설정 및 마이그레이션에 유용한 명령줄 도구.  
sequelize 미들웨어에 통합되어 많은 RDB에서 사용할 수 있다.  

~~~
sudo npm install -g sequelize-cli
npm install sequelize --save
~~~

`.sequelizerc`에 모듈을 작성한 뒤 아래 명령을 입력한다.
~~~
sequelize init
~~~
애플리케이션 스키마를 저장할 모델 디렉터리, 설정 파일, 시더와 마이그레이션 스크립트를 담을 폴더를 생성한다.