#include <MFRC522.h>
#include <SPI.h>
#include "WiFi.h"
#include <HTTPClient.h> //HTTP 통신을 위한 라이브러리
#include <ArduinoJson.h> //RFID tag의 정보를 Json 형태로 변환 하기 위한 라이브러리

#define SS_PIN 21
#define RST_PIN 22
#define SIZE_BUFFER 18
#define MAX)SIZE_BLOCK 16

MFRC522::MIFARE_Key key;
MFRC522::StatusCode status;
//Defined pins to module RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);
//
const char* ssid     = "MyWifi";    // 연결할 SSID
const char* password = "123456788a";     // 연결할 SSID의 비밀번호

boolean check = false;
boolean check2 = false;

String serverName = "http://52.78.190.152/api/stock";

void setup()
{
    Serial.begin(115200);
    delay(10);
    
    WiFi.begin(ssid, password);
    SPI.begin(); //Init SPI bus

    // 와이파이망에 연결
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Conneccting to Wifi...");
    }
    Serial.println("Connected to the Wifi network");
    //RFID 연결
    mfrc522.PCD_Init();
    Serial.println("RFID connected success");
    Serial.println();

    //RFID Reader ID 저장
    for(byte i =0;i<6;i++){
    key.keyByte[i] = 0xFF;
    }
    Serial.print(F("Leader NUID is : "));
    printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
}

// 연결 여부 로그 출력
void loop() {

 //새로운 카드가 인식되면 다음으로 넘어가고 아니면 실행안하고 리턴
 if ( ! mfrc522.PICC_IsNewCardPresent())
    return;

 //ID가 읽혀졌다면 다음으로 넘어가고 아니면 리턴
 if ( ! mfrc522.PICC_ReadCardSerial())
    return;
    
 //Post data set
 DynamicJsonDocument doc(1024);
  
 //tag가 읽히면 JSON 에 정보 삽입
 //Reader ID insert into JSON
  for(byte i=0;i<mfrc522.uid.size;i++){
  doc["assetId"][i] = mfrc522.uid.uidByte[i];
 }

 for(byte i=0;i<MFRC522::MF_KEY_SIZE;i++){
  doc["locationId"][i] = key.keyByte[i];
 }


 //tag정보 익기
   if (mfrc522.uid.uidByte[0] == 0x93 && 
     mfrc522.uid.uidByte[1] == 0x71 &&
     mfrc522.uid.uidByte[2] == 0x68 &&
     mfrc522.uid.uidByte[3] == 0x02) {
      //asset in
      if(check == false){
        check = true;
        doc["status"] = check;
        }
      //asset out
      else{
        check = false;
        doc["status"] = check;
      }
    }

//RFID READER read blue tag
  else if (mfrc522.uid.uidByte[0] == 0x39 && 
     mfrc522.uid.uidByte[1] == 0x70 &&
     mfrc522.uid.uidByte[2] == 0x5E &&
     mfrc522.uid.uidByte[3] == 0xD3) {
       //asset in
      if(check2 == false){
        check2 = true;
        doc["status"] = check2;
        }
      //asset out
      else{
        check2 = false;
        doc["status"] = check2;
        }
    }
    
 Serial.print("Sending : ");
 serializeJson(doc, Serial);
 Serial.println();

     //json object -> document
 String json_str;
 serializeJson(doc, json_str);
 
 //카드가 읽혀져야 WIFI 와 연결가능
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

   
   HTTPClient http;   
  
   http.begin(serverName);  //Specify destination for HTTP request
   

   http.addHeader("Content-Type", "application/json"); //POST의 json 방식으로 서버에 데이터 전송
  
   int httpResponseCode = http.POST(json_str);   //Send the actual POST request

   
   if(httpResponseCode>0){//서버측 수신 성공 시
    String response = http.getString();
    Serial.println("Send data to Server success!!!");
    Serial.println(httpResponseCode);
   }
   else{
    Serial.print("Error on Sending POSt");
    Serial.println(httpResponseCode);
   }

  
   http.end();  //Free resources
  
 }else{
  
    Serial.println("Error in WiFi connection");   
  
 }
  
  delay(10000);  //Send a request every 10 seconds
}

void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
  Serial.println();
}
