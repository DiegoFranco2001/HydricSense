#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include "SerialComs.h"
#include "SoftwareSerial.h"

#define FIREBASE_HOST 	"" //Firebase URL
#define FIREBASE_AUTH 	"" //Firebase authentication

String WIFI_SSID = "";
String WIFI_PASSWORD = "";

FirebaseData data;

const int RX_pin = 13;
const int TX_pin = 12;

SoftwareSerial nodemcu(RX_pin, TX_pin);
SerialComs coms;

void setup() {
  Serial.begin(115200);
  nodemcu.begin(9600);
  
  SafeString::setOutput(Serial);
  coms.setAsController();

  if (!coms.connect(nodemcu)) {
    while (1) {
      Serial.println(F("Out of memory"));
    }
  }
  Serial.println(F("ESP8266 Setup finished."));
}

void loop() {
  coms.sendAndReceive();

  if (!coms.textReceived.isEmpty()) {

    if (coms.textReceived.charAt(0) == 'c') {
      setCredentials(coms.textReceived.c_str());
      delay(200);
      initWifi();
      delay(200);
      initFirebaseConnection();
      delay(200);
    } else if (!(WIFI_SSID == "" || WIFI_PASSWORD == "")) {
      if (!Firebase.readStream(data)){
        Serial.println("Can't read stream data");
        Serial.println("REASON: " + data.errorReason());
      } else if (data.streamTimeout()) {
        Serial.println("Stream timeout, resume streaming...");
      } else if (data.streamAvailable()) {
        if (coms.textReceived.charAt(0) == 'p') {
          Serial.println(coms.textReceived);
          Firebase.setString(data, "/ph/value", coms.textReceived.c_str());
        } else if (coms.textReceived.charAt(0) == 't') {
          Serial.println(coms.textReceived);
          Firebase.setString(data, "/temp/value", coms.textReceived.c_str());
        } else if (coms.textReceived.charAt(0) == 'u') {
          Serial.println(coms.textReceived);
          Firebase.setString(data, "/turb/value", coms.textReceived.c_str());
        }
      }
    } else {
      Serial.println("Please, set a wifi connection.");
      delay(1000);
    }
  }
}

void initWifi () {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }

  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
}

void setCredentials (String str) {
  String ssid = "";
  String password = "";
  int current = 0;
  
  for (int i = 1; i < str.length(); i++) {
    if (current == 0) {
      if (str.charAt(i) == ':') {
        current = 1;
      } else {
        ssid.concat(str.charAt(i));
      }
    } else {
      password.concat(str.charAt(i));
    }
  }

  WIFI_SSID = ssid;
  WIFI_PASSWORD = password;
}

void initFirebaseConnection () {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  if (!Firebase.beginStream(data, "/ph/value")) {
    Serial.println("Could not begin pH stream: " + data.errorReason());
  }

  if (!Firebase.beginStream(data, "/temp/value")) {
    Serial.println("Could not begin temperature stream: " + data.errorReason());
  }

  if (!Firebase.beginStream(data, "/turb/value")) {
    Serial.println("Could not begin temperature stream: " + data.errorReason());
  }  
}
