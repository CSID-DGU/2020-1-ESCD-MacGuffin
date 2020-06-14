세션 확인
GET /session
  request: None
  response:
    Success:
      status: 200
      header:
      {
        Content-Type: application/json 
      }
      body: application/json
      {
        userId: string,
        email: string,
      }
    Not logged in:
      status: 401

로그인
POST /session
  request:
    header:
    {
      Content-Type: application/json 
    }
    body:
    {
      userId: string,
      password: string,
    }
    
  response:
    Success:
      status: 201
      header:
      {
        Content-Type: application/json 
      }
      body: application/json
      {
        userId: string,
        email: string,
      }
    Not logged in:
      status: 401

로그아웃
DELETE /session
  request: None
  response:
    status: 204
