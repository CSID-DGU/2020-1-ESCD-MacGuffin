#include <MFRC522.h>
#include <SPI.h>
#include "WiFi.h"
#include <HTTPClient.h> //HTTP 통신을 위한 라이브러리

#define SS_PIN 21
#define RST_PIN 22
#define SIZE_BUFFER 18
#define MAX)SIZE_BLOCK 16

MFRC522::MIFARE_Key key;
MFRC522::StatusCode status;
//Defined pins to module RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

const char* ssid     = "MyWifi";    // 연결할 SSID
const char* password = "123456788a";     // 연결할 SSID의 비밀번호

String serverName = "http://52.78.190.152";

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
}

// 연결 여부 로그 출력
void loop() {

 //새로운 카드가 인식되면 다음으로 넘어가고 아니면 실행안하고 리턴
 if ( ! mfrc522.PICC_IsNewCardPresent())
    return;

 //ID가 읽혀졌다면 다음으로 넘어가고 아니면 리턴
 if ( ! mfrc522.PICC_ReadCardSerial())
    return;
 
 //카드가 읽혀져야 WIFI 와 연결가능
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

   Serial.println("Data send by wifi.");
   
   HTTPClient http;   
  
   http.begin(serverName);  //Specify destination for HTTP request

   http.addHeader("Content-Type", "application/jason"); //POST의 json 방식으로 서버에 데이터 전송

   String jsondata = "Tlqkf";

   http.POST("{\"testSSID\":\"Tlqkf\"}");
   
   //string testRequentData = 
   
  // int httpResponseCode = http.POST("{\"testN\"}");   //Send the actual POST request


//   
//   if(httpResponseCode>0){
//  
//    String response = http.getString();                       //Get the response to the request
//  
//    Serial.println(httpResponseCode);   //Print return code
//    Serial.println(response);           //Print request answer
//  
//   }else{
//  
//    Serial.print("Error on sending POST: ");
//    Serial.println(httpResponseCode);
//  
//   }
  
   http.end();  //Free resources
  
 }else{
  
    Serial.println("Error in WiFi connection");   
  
 }
  
  delay(10000);  //Send a request every 10 seconds
}
