#include <SPI.h>
#include <MFRC522.h>
#include <string.h>
#include <WIFI.h>
#include <HTTPClient.h>


#define RST_PIN 9
#define SS_PIN 10

const char* ssid = "mywifi"
const char* password = "123456788a"

//Domain name with URL path or IP address with path
String serverName = "http://

MFRC522 mfrc522(SS_PIN, RST_PIN); //create MFRC52 instance
MFRC522::MIFARE_Key key; 

byte* data;
byte nuidPICC[4]; //reader NUID
//String a, b, c, d;

boolean check = false;
boolean check2 = false;


unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

void setup(){
  Serial.begin(9600);
  while(!Serial);
  SPI.begin();
  //WIFI connecting
  WIFI.begin(ssid, password);
  Serial.println("Connecting");
  while(WIFI.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to wifi network with ip address :");
  Serial.println(Wifi.localIP());

  Serial.println("Timer set to 5 seconds (timerDelay varialbe)");
 
  
  mfrc522.PCD_Init();
  mfrc522.PCD_DumpVersionToSerial();

  //Deside Reader NUID and printout
  for(byte i =0;i<6;i++){
    key.keyByte[i] = 0xFF;
  }
  Serial.print(F("Leader NUID is : "));
  printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
  Serial.println(F("scan tag UID "));
}



void loop(){
  //send and HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "?temperature=24.37";
      
      // Your Domain name with URL path or IP address with path
      http.begin(serverPath.c_str());
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }

  //post data to webserver

  //if card Read successed, go next else stop return
  if(!mfrc522.PICC_IsNewCardPresent()) return;

  //if Id read successed, go next else  return
  if(!mfrc522.PICC_ReadCardSerial()) return;

  //read card or tag type
   MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);

  //Check MIFARE type, if not , return
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
    piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
    piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    Serial.println(F("Your tag is not of type MIFARE Classic."));
    return;
  }
  
//RFID READER read Card tag UID
  if (mfrc522.uid.uidByte[0] == 0x93 && 
     mfrc522.uid.uidByte[1] == 0x71 &&
     mfrc522.uid.uidByte[2] == 0x68 &&
     mfrc522.uid.uidByte[3] == 0x02) {
      Serial.println("Card Read complete");
      //asset in
      if(check == false){
        check = true;
        Serial.println("Asset tranfer inside(Card) ");
        }
      //asset out
        else{
          check = false;
          Serial.println("Asset tranfer outside(Card) ");
        }
    }

//RFID READER read blue tag
  else if (mfrc522.uid.uidByte[0] == 0x39 && 
     mfrc522.uid.uidByte[1] == 0x70 &&
     mfrc522.uid.uidByte[2] == 0x5E &&
     mfrc522.uid.uidByte[3] == 0xD3) {
      Serial.println("tag Read complete");
       //asset in
      if(check2 == false){
        check2 = true;
        Serial.println("Asset tranfer inside(tag) ");
        }
      //asset out
        else{
          check2 = false;
          Serial.println("Asset tranfer outside(tag) ");
        }
    }
//tag information it not exist
   else{
    Serial.println("tag is not exist try again");
   }


    // PICC 종료
   mfrc522.PICC_HaltA();

  // 암호화 종료
   mfrc522.PCD_StopCrypto1();

}


/**
 * Helper routine to dump a byte array as hex values to Serial. 
 */
void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
  Serial.println();
}