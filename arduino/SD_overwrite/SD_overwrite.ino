/*
 * Overwrite a file, here "SD_card.txt"
 */

#include <SD.h>

#define PIN_SPI_CS (2)

File myFile;

void setup() {
  Serial.begin(9600);
  while (!Serial) delay(10);

  Serial.println("Hello");
  
  if (!SD.begin(PIN_SPI_CS)) {
    Serial.println(F("SD CARD FAILED, OR NOT PRESENT!"));
    while (1); // don't do anything more:
  }

  Serial.println(F("SD CARD INITIALIZED."));
  SD.remove("SD_card.txt"); // delete the file if existed

  // create new file by opening file for writing
  myFile = SD.open("SD_card.txt", FILE_WRITE);

  if (myFile) {
    myFile.println("Test ligne 1 "); // write a line to Arduino
    myFile.println("Essai d'écriture ligne 2"); // write another  line to Arduino
    myFile.close();
  } else {
    Serial.print(F("SD Card: error on opening file SD_card.txt"));
  }

  Serial.println();
  Serial.println("Ecriture faite sur la carte");
  Serial.println();
  
  // open file for reading
  myFile = SD.open("SD_card.txt", FILE_READ);
  if (myFile) {
    while (myFile.available()) {
      char ch = myFile.read(); // read characters one by one from Micro SD Card
      Serial.print(ch); // print the character to Serial Monitor
    }
    myFile.close();
  } else {
    Serial.print(F("SD Card: error on opening file SD_card.txt"));
  }
}

void loop() {
}
