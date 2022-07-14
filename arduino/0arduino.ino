#include <SoftwareSerial.h>
#include "SerialComs.h"

int pinPh = A0;
int pinTemperature = A1;
int pinTurbidity = A2;

String wifiCredentials;
int settingWifi = 0;
int currentValue = 0;

const int Rx = 10;
const int Tx = 11;

SoftwareSerial nodemcu(Rx, Tx);
SerialComs coms;

void setup() {
  Serial.begin(9600); 
  nodemcu.begin(9600); 
  
  pinMode(pinPh, INPUT);
  pinMode(pinTemperature, INPUT);
  pinMode(pinTurbidity, INPUT);
  
  SafeString::setOutput(Serial);

  if (!coms.connect(nodemcu)) {
    while (1) {
      Serial.println(F("Out of memory"));
      delay(3000);
    }
  }

  Serial.println(F("READY..."));
}

void loop() {
  coms.sendAndReceive();

  if (Serial.available() > 0) {
    char value = Serial.read();
    wifiCredentials.concat(value);
    settingWifi = 1;
  } else {
    if (coms.textToSend.isEmpty()) {

      if (settingWifi == 1) {
        sendCredentials();
        Serial.println(coms.textToSend);
        settingWifi = 0;
        wifiCredentials = String();
        delay(4000);
        
      } else {

        if (currentValue == 0) {
          coms.textToSend.print("p");
          coms.textToSend.print(phReader());
          Serial.println(coms.textToSend);
          currentValue = 1;
        } else if (currentValue == 1) {
          coms.textToSend.print("t");
          coms.textToSend.print(temperatureReader());
          Serial.println(coms.textToSend);
          currentValue = 2;
        } else if (currentValue == 2) {
          coms.textToSend.print("u");
          coms.textToSend.print(turbidityReader()); 
          Serial.println(coms.textToSend);
          currentValue = 0;
        }
                
      }
    }
    
    delay(5000);
  }
}

void sendCredentials () {
  coms.textToSend.print("c");
  for (int i = 0; i < wifiCredentials.length(); i++) {
    coms.textToSend.print(wifiCredentials.charAt(i));
  }
}


/*
* VALUES READER, PH, TEMPERATURE, TURBIDITY
*/

float phReader() {
  float calibration_value = 21.34 - 0.7;
  int phval = 0;
  unsigned long int avgval;
  int buffer_arr[10], temp;
  float ph_act;

  for (int i = 0; i < 10; i++) {
    buffer_arr[i] = analogRead(pinPh);
    delay(30);
  }

  for (int i = 0; i < 9; i++)
    for (int j = i + 1; j < 10; j++)
      if (buffer_arr[i] > buffer_arr[j])
      {
        temp = buffer_arr[i];
        buffer_arr[i] = buffer_arr[j];
        buffer_arr[j] = temp;
      }

  avgval = 0;
  
  for (int i = 2; i < 8; i++)
    avgval += buffer_arr[i];
  
  float volt = (float)avgval * 5.0 / 1024 / 6;
  ph_act = -5.70 * volt + calibration_value;

  return ph_act;
}

float turbidityReader() {
  float volt = 0.0f;
  float ntu = 0.0f;

  for (int i = 0; i < 800; i++)
    volt += ((float) analogRead(pinTurbidity) / 1023) * 5;

  volt = volt / 800;
  volt = roundValue(volt, 2);

  if (volt < 2.5) 
    ntu = 3000;
  else 
    ntu = -1120.4 * square(volt) + 5742.3 * volt - 4353.8;

  return ntu;
}

int temperatureReader() {
  int value = analogRead(pinTemperature);
  // 1024000 : 260000
  double temperature = log(((260000 / value) - 10000));

  temperature = 1 / (0.001129148 + (0.000234125 * temperature) + (0.0000000876741 * temperature * temperature * temperature));
  temperature = temperature - 273.15;
  return temperature;
}

float roundValue(float value, int decimalPlace) {
  float multiplier = powf(10.0f, decimalPlace);
  value = roundf(value * multiplier) / multiplier;
  return value;
}
