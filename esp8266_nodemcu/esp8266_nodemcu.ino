#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include "SerialComs.h"
#include "SoftwareSerial.h"

#define FIREBASE_HOST 	"database-url.firebaseio.com"
#define FIREBASE_AUTH 	"PASSWORD_FIREBASE"
#define WIFI_SSID 		"user"
#define WIFI_PASSWORD 	"password"

FirebaseData data;

const int RX_pin = 13;
const int TX_pin = 12;

SoftwareSerial softSerial(RX_pin, TX_pin);
SerialComs coms;

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }

  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  SafeString::setOutput(Serial);
  softSerial.begin(9600);
  coms.setAsController();

  if (!coms.connect(softSerial)) {
    while (1) {
      Serial.println(F("Out of memory"));
    }
  }
  Serial.println(F("ESP8266 Setup finished."));

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  if (!Firebase.beginStream(data, "/databasepath"))
  {
    Serial.println("Could not begin stream");
    Serial.println("REASON: " + data.errorReason());
    Serial.println();
  }
}

void loop() {
  coms.sendAndReceive();

  if (!coms.textReceived.isEmpty()) {
    if (!Firebase.readStream(data))
    {
      Serial.println("Can't read stream data");
      Serial.println("REASON: " + data.errorReason());
    }

    if (data.streamTimeout())
    {
      Serial.println("Stream timeout, resume streaming...");
    }

    if (data.streamAvailable()) {
      Serial.println(coms.textReceived);
      Firebase.setString(data, "/databasepath", coms.textReceived.c_str());
    }
  }
}
