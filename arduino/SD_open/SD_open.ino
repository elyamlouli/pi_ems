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

#define PIN_SPI_CS (2)
#define File_Name "PI_SD.txt"
File myFile;
byte ID_1[7]={255, 128, 255, 0, 0, 0, 255};
byte ID_2[7]={255, 150, 255, 16, 0, 255, 0};

void printID(byte ID[7])
{
  for (int i=0;i<8;i++)
  {
    myFile.print(ID[i] >> 4, HEX);
    myFile.print(ID[i] & 0xF, HEX);
    myFile.print(" ");
  }
  myFile.println();
}

void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);

  //Serial.println("Hello!");
  //Serial.print(F("PIN_SPI_CS : "));
  //Serial.println(PIN_SPI_CS);
  
  if (!SD.begin(PIN_SPI_CS)) {
    Serial.println(F("SD CARD FAILED, OR NOT PRESENT!"));
    while (1); // don't do anything more
  }

  Serial.println(F("SD card initialized"));

  if (!SD.exists(File_Name)) {
    Serial.print(File_Name);
    Serial.print(F(" doesn't exist. Creating "));
    Serial.print(File_Name);
    Serial.println(F(" file..."));
    // create a new file by opening a new file and immediately close it
    myFile = SD.open(File_Name, FILE_WRITE);
    myFile.close();
  }
  delay(2);
  
  // recheck if file is created or not
  if (SD.exists(File_Name)){
    Serial.print(File_Name);
    Serial.println(F(" exists on SD Card."));
  }
  else {
    Serial.print(File_Name);
    Serial.println(F(" doesn't exist on SD Card."));
    while(1);  // don't do anything more
  }

  Serial.println();
  Serial.println("- Writing test -");
  
  myFile = SD.open(File_Name, FILE_WRITE);

  // open file for writing
  if (myFile) {
    printID(ID_1);
    printID(ID_2);
    myFile.close();
  } else {
    Serial.print(F("SD Card: error on opening file arduino.txt"));
  }
  Serial.println("writing --OK");
  
  // open file for reading
  Serial.println();
  Serial.println("- Reading test -");
  
  myFile = SD.open(File_Name, FILE_READ);
  if (myFile) {
    int id_count = 0;
    int size_buffer = 100;
    while (myFile.available()) {
      char line[size_buffer]={0}; // maximum is 99 (or 100?) characters, change it if needed
      int line_length = myFile.readBytesUntil('\n', line, size_buffer); // read line-by-line from Micro SD Card
      id_count++;

      Serial.print(F("ID "));
      Serial.print(id_count);
      Serial.print(F(": "));
      Serial.write(line, line_length); // print the character to Serial Monitor
      // \n character is escaped by readBytesUntil function
      Serial.write('\n'); // print a new line charactor
    }
    
    Serial.println("reading --OK");
    myFile.close();
  } else {
    Serial.print(F("SD Card: error on opening file "));
    Serial.println(File_Name);
  }

  Serial.println();
}

void loop() {
}
