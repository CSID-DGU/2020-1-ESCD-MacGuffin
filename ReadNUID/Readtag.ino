#include <SPI.h>
#include <MFRC522.h>
#include <string.h>

#define RST_PIN 9
#define SS_PIN 10

MFRC522 mfrc522(SS_PIN, RST_PIN); //create MFRC52 instance
MFRC522::MIFARE_Key key; 

byte* data;
byte nuidPICC[4]; //reader NUID
//String a, b, c, d;

boolean check = false;
boolean check2 = false;

void setup(){
  Serial.begin(9600);
  while(!Serial);
  SPI.begin();
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
  
  //mfrc522.PICC_DumpToSerial(&(mfrc522.uid));

// --------------------- 1차 -----------------
//인식시간 설정
//reader 기 id 설정
//기존의 tag 인식
//새로운 tag 인식 시 New asset 으로 DB에 저장 -> 추후 프론트에서 수정가능
//in and out 추가 for  자산의 입출입 확인
// 첫번째 입력 시 in, 두번째 입력 시 out
// in, out 에 따라 DB에 자동입력
//----------------------- 2차 -------------------
// 정보의 이동시 암호화 실시
// --------------------------------------------
//tag 인식 시간 설정
//reader NUID 설정
//자산의 in and out 표현
//DB에 보낼 정보 -> RFID READER의 고유 ID, TAG의 고유 ID, TAG의 IN and OUT 정보

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