#include <SoftwareSerial.h>
#include "SerialComs.h"

int pinPh = A0;
int pinTemperature = A1;
int pinTurbidity = A2;

int arrLength = 3;

float phvalues[3] = {0.0f, 0.0f, 0.0f};
int tevalues[3] = {0, 0, 0};
float tuvalues[3] = {0.0f, 0.0f, 0.0f};

const int Rx = 10;
const int Tx = 11;

SoftwareSerial nodemcu(Rx, Tx);
SerialComs coms;

void setup() {
  Serial.begin(115200);
  pinMode(pinPh, INPUT);
  pinMode(pinTemperature, INPUT);
  pinMode(pinTurbidity, INPUT);

  SafeString::setOutput(Serial);
  nodemcu.begin(9600);

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

  if (coms.textToSend.isEmpty()) {
    float ph = phReader();
    int te = temperatureReader();
    float tu = turbidityReader();

    phorder(ph);
    teorder(te);
    tuorder(tu);

    sender();

    Serial.println(coms.textToSend);
  }

  delay(2000);
}

void sender() {
  for (int i = 0; i < arrLength; i++) {
    coms.textToSend.print(phvalues[i], 1);
    if (i == arrLength - 1) break;
    coms.textToSend.print(",");
  }

  coms.textToSend.print(":");

  for (int i = 0; i < arrLength; i++) {
    coms.textToSend.print(tevalues[i]);
    if (i == arrLength - 1) break;
    coms.textToSend.print(",");
  }

  coms.textToSend.print(":");

  for (int i = 0; i < arrLength; i++) {
    coms.textToSend.print(tuvalues[i], 1);
    if (i == arrLength - 1) break;
    coms.textToSend.print(",");
  }
}

void phorder(float newvalue) {
  for (int i = 0; i < arrLength; i++) {
    if (i == arrLength - 1) break;
    phvalues[i] = phvalues[i + 1];
  }

  phvalues[arrLength - 1] = newvalue;
}

void teorder(int newvalue) {
  for (int i = 0; i < arrLength; i++) {
    if (i == arrLength - 1) break;
    tevalues[i] = tevalues[i + 1];
  }

  tevalues[arrLength - 1] = newvalue;
}

void tuorder(float newvalue) {
  for (int i = 0; i < arrLength; i++) {
    if (i == arrLength - 1) break;
    tuvalues[i] = tuvalues[i + 1];
  }

  tuvalues[arrLength - 1] = newvalue;
}

float phReader() {
  float calibration_value = 21.34 - 0.7;
  int phval = 0;
  unsigned long int avgval;
  int buffer_arr[10], temp;
  float ph_act;

  for (int i = 0; i < 10; i++)
  {
    buffer_arr[i] = analogRead(pinPh);
    delay(30);
  }

  for (int i = 0; i < 9; i++)
  {
    for (int j = i + 1; j < 10; j++)
    {
      if (buffer_arr[i] > buffer_arr[j])
      {
        temp = buffer_arr[i];
        buffer_arr[i] = buffer_arr[j];
        buffer_arr[j] = temp;
      }
    }
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

  for (int i = 0; i < 800; i++) {
    volt += ((float) analogRead(pinTurbidity) / 1023) * 5;
  }

  volt = volt / 800;
  volt = roundValue(volt, 2);

  if (volt < 2.5) {
    ntu = 3000;
  } else {
    ntu = -1120.4 * square(volt) + 5742.3 * volt - 4353.8;
  }

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
