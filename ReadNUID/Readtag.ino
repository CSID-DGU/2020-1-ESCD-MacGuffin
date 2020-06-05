#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 9
#define SS_PIN 10

MFRC522 mfrc522(SS_PIN, RST_PIN); //create MFRC52 instance

void setup(){
  Serial.begin(9600);
  while(!Serial);
  SPI.begin();
  mfrc522.PCD_Init();
  mfrc522.PCD_DumpVersionToSerial();
  Serial.println(F("scan PICC to UID, SAK type, and data blocks...."));
}



void loop(){
  if(!mfrc522.PICC_IsNewCardPresent()) return;

  if(!mfrc522.PICC_ReadCardSerial()) return;

  //mfrc522.PICC_DumpToSerial(&(mfrc522.uid));

//인식시간 설정
//RFID READER read Card tag UID
  if (mfrc522.uid.uidByte[0] == 0x93 && 
     mfrc522.uid.uidByte[1] == 0x71 &&
     mfrc522.uid.uidByte[2] == 0x68 &&
     mfrc522.uid.uidByte[3] == 0x02) {
      Serial.println("Card Read complete");
    }

//RFID READER read blue tag
  if (mfrc522.uid.uidByte[0] == 0x39 && 
     mfrc522.uid.uidByte[1] == 0x70 &&
     mfrc522.uid.uidByte[2] == 0x5E &&
     mfrc522.uid.uidByte[3] == 0xD3) {
      Serial.println("tag Read complete");
    }
    
}
