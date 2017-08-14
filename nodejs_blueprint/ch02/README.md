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
계정은 root/root

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

`config.json`에서 mysql 접속 정보를 수정한다.  
***
### 데이터 스키마 생성

아래 명령어를 통해 사용자를 위한 간단한 스키마를 생성한다.
~~~
sequelize model:create --name User --attributes "name:string, email:string"
~~~
models/user.js파일이 생성되고, migrations 폴더에는 고유한 해시 값과 DB에 실행될 동작이 포함된 이름의 마이그레이션 파일이 생성된다.
이 마이그레이션 파일에는 DB에 User 테이블을 생성할 때 필요한 보일러플레이트 코드가 들어있다. 

유저가 시스템에 생성하는 밴드 데이터의 데이터베이스 스키마를 생성한다
~~~
sequelize model:create --name Band --attributes "name:string, description:string, album:string, year:string, UserId:integer"
~~~
마찬가지로 2개의 파일이 생성된다.

밴드 모델과 유저 모델은 다음과 같은 관계가 있다
| 모델 | 관계 |
| --- | --- |
| Band.js | Band.belongsTo(models.User); |
| User.js | User.hasMany(models.Band); |
이에 맞춰 각 모델.js를 수정한다.
***
### MySQL에 데이터베이스 생성
~~~
mysql -uroot -proot //(mysql -u[username] -p[password])

mysql> CREATE DATABASE mvc_mysql_app;
~~~
***
### MySQL에 마이그레이션
~~~
npm install mysql
npm install mysql2 // 이것도 설치하라고 에러가 남
sequelize db:migrate
~~~
아래와 같이 마이그레이션이 잘 되었는지 확인한다.
~~~
mysql> show databases;
mysql> use mvc_mysql_app;
mysql> show tables;
~~~