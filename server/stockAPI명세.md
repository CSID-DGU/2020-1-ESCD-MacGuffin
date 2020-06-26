에셋 리스트 조회
POST /stock
  request: 
    header:
    {
      Content-Type: application/json 
    }
    body:
    {
      assetId: [ number, number, number, number ],
      locationId: [ number, number, number, number ],
      status: boolean
    }
  response:
    Success(등록 성공):
      status : 201
    Success(등록 취소 성공):
      status : 204
    잘못된 assetId/locationId:
      status: 404
    이미 등록됨:
      status: 409
