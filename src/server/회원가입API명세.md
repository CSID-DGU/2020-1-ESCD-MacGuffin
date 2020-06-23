회원가입
POST /users
  request:
   header:
    {
      Content-Type: application/json 
    }
    body:
    {
      userId: string, // 이메일 형식
      password: string,
      userName: string
    }

  response:
    Success:
      status : 201
    (중복된 정보로 시도할 시):
      status : 409
     

회원탈퇴(삭제) // 개발용으로 임시로 만든거라 프론트 구현 필요없을듯
DELETE /users/{userId}
  request:
    NONE
  response:
    status : 204
  (현재 이 아이디로 로그인 되어있을 시 로그아웃까지 실행)

회원조회(전체) // 나중에 자산조회 등에 사용할 수 있는 API
GET /users
  request :
    NONE
  response:
    Success:
      status : 200 (배열 출력)
    
회원조회
GET /users/{userId}
  request:
    NONE
  response:
    Success :
      status: 200
    조회하고자 할 정보 없음: 
      status: 404