/*
 * Gère l'ouverture d'un fichier sur la carte SD
 * 
 * Ajout d'ID à la suite 
 * 
 * Lecture ligne par ligne
 * 
 * Il faut vérifier la taille des ID 
 * 
 * Pour modifier la liste des IDs il faut faire de la gestion mémoire ?
 * car on enlève une ligne et on remonte celles du dessous pour ne pas perdre de lignes 
 * ou recopier le dernier écrit et remonter de 1 le EOF
 * 
 * Faire un tri sur les ID pour les retrouver ? -> si besoin, pour l'instant assez de puissance de calcul
 */

#include <SD.h>
#include <MKRWAN.h>

#define PIN_SPI_CS (2)

/*
#include "arduino_secrets.h"
// Please enter your sensitive data in the Secret tab or arduino_secrets.h
String appEui = SECRET_APP_EUI;
String appKey = SECRET_APP_KEY;
String devKey = SECRET_DEV_KEY;
*/

LoRaModem modem;
File myFile;

void setup() {
  Serial.begin(115200);
  while (!Serial) ;
  delay(10); // to have the time to open Serial port
  
  Serial.println("Hello!");
  Serial.print(F("PIN_SPI_CS : "));
  Serial.println(PIN_SPI_CS);
  
  if (!SD.begin(PIN_SPI_CS)) {
    Serial.println(F("SD CARD FAILED, OR NOT PRESENT!"));
    while (1); // don't do anything more
  }
  /*
  if (!modem.begin(EU868)) {
    Serial.println("Failed to start module");
    while (1) {}
  };

  Serial.print("Your module version is: ");
  Serial.println(modem.version());
  Serial.print("Your device EUI is: ");
  int connected = modem.joinOTAA(appEui, appKey, devKey);
  if (!connected) {
    Serial.println("Something went wrong; are you indoor? Move near a window and retry");
    while (1) {}
  }
  Serial.println(modem.deviceEUI());

  // Set poll interval to 60 secs.
  modem.minPollInterval(60);
  // NOTE: independent of this setting, the modem will
  // not allow sending more than one message every 2 minutes,
  // this is enforced by firmware and can not be changed.
  */


  Serial.println(F("SD CARD INITIALIZED."));

  if (!SD.exists("arduino.txt")) {
    Serial.println(F("arduino.txt doesn't exist. Creating arduino.txt file..."));
    // create a new file by opening a new file and immediately close it
    myFile = SD.open("arduino.txt", FILE_WRITE);
    myFile.close();
  }

  // recheck if file is created or not
  if (SD.exists("arduino.txt"))
    Serial.println(F("arduino.txt exists on SD Card."));
  else {
    Serial.println(F("arduino.txt doesn't exist on SD Card."));
    while(1);  // don't do anything more
  }

  Serial.println();
  Serial.println("Test d'écriture");
  
  myFile = SD.open("arduino.txt", FILE_WRITE);

  // open file for writing
  if (myFile) {
    myFile.println("Test 1 d'écriture"); // write a line to Arduino
    myFile.println("Ligne 2 de test"); // write another  line to Arduino
    myFile.close();
  } else {
    Serial.print(F("SD Card: error on opening file arduino.txt"));
  }

  Serial.println();
  Serial.println("Ecriture réussie");
  
  // open file for reading
  Serial.println();
  Serial.println("Test de lecture");
  Serial.println();
  
  myFile = SD.open("arduino.txt", FILE_READ);
  if (myFile) {
    int line_count = 0;
    int size_buffer = 100;
    while (myFile.available()) {
      char line[size_buffer]={0}; // maximum is 99 (or 100?) characters, change it if needed
      int line_length = myFile.readBytesUntil('\n', line, size_buffer); // read line-by-line from Micro SD Card
      line_count++;

      Serial.print(F("ID "));
      Serial.print(line_count);
      Serial.print(F(": "));
      Serial.write(line, line_length); // print the character to Serial Monitor
      // \n character is escaped by readBytesUntil function
      Serial.write('\n'); // print a new line charactor
    }
    
    Serial.println();
    Serial.println("Fin de lecture");
    Serial.println();
    myFile.close();
  } else {
    Serial.print(F("SD Card: error on opening file arduino.txt"));
  }

  
}

void loop() {
  
  Serial.println();
  Serial.println("Enter a message to send to network");
  Serial.println("(make sure that end-of-line 'NL' is enabled)");
  
  while (!Serial.available());
  String msg = Serial.readStringUntil('\n');
//
//  Serial.println();
//  Serial.print("Sending: " + msg + " - ");
//  for (unsigned int i = 0; i < msg.length(); i++) {
//    Serial.print(msg[i] >> 4, HEX);
//    Serial.print(msg[i] & 0xF, HEX);
//    Serial.print(" ");
//  }
//  Serial.println();
  
  
  byte payload[9]={2, 0, 255, 128, 255, 0, 0, 0, 255};
  int err;
  modem.setPort(1);
  modem.beginPacket();
  for (unsigned int i = 0; i < 9; i++)
  {
    Serial.println(payload[i]);
    modem.write(payload[i]);
  }
  err = modem.endPacket(true);
  if (err > 0) {
    Serial.println("Message sent correctly!");
  } else {
    Serial.println("Error sending message :");
    Serial.println("(you may send a limited amount of messages per minute, depending on the signal strength");
    Serial.println("it may vary from 1 message every couple of seconds to 1 message every minute)");
  }
  delay(1000);
  if (!modem.available()) {
    Serial.println("No downlink message received at this time.");
    return;
  }

  //                { channel, type, UID (7 bytes) }
  //byte payload[9]={2, 0, 255, 128, 255, 0, 0, 0, 255};
  char rcv[64];
  int i = 0;
  while (modem.available()) {
    rcv[i++] = (char)modem.read();
  }
  Serial.print("Received: ");
  for (unsigned int j = 2; j < i; j++) {
    Serial.print(rcv[j] >> 4, HEX);
    Serial.print(rcv[j] & 0xF, HEX);
    Serial.print(" ");

    
    if (myFile) { // stockage en Hexadécimal sur la carte SD
      myFile.print(rcv[j] >> 4, HEX); // 4 premiers bits du char
      myFile.print(rcv[j] & 0xF, HEX); // 4 derniers bits du char 
    } 
    else {
      Serial.print(F("SD Card: error on opening file arduino.txt"));
    }
    
  Serial.println();

  }
  myFile.println("");

  //myFile.close();
}
