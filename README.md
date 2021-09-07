# blog

개발자 인생 첫 결과물입니다.

`핵심 기능`

회원가입, 로그인, 게시글 & 댓글 CRUD

`21-07-13 Refactoring`

 - query string -> path variable 방식으로 변경
 
 - Primary Key 값을 router 에서 render 시 함께 보내는 방식으로 변경
 
 - RESTful api 방식에 따른 url, 함수명 재정의

`21-07-14 Refactoring`

 - token 유무로 로그인시 회원가입, 로그인 버튼이 안 보이게

 - 모든 페이지에 로그인한 유저 이름 표시

 - 서버에 값을 보내는 방식을 ajax 와 form 두가지로 구현

`21-07-15 Refactoring`

 - password hashing with bcrypt
