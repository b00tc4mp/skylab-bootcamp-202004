
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS D4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
String data;

const char* ssid = "skylabCodersAcademy";
const char* password = "skylabRocks";

const char* serverName = "http://192.168.0.35:8080/api/temperature/123123123";


unsigned long lastTime = 0;

unsigned long timerDelay = 5000;

void setup() {
  sensors.begin();
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {

  if ((millis() - lastTime) > timerDelay) {

    if (WiFi.status() == WL_CONNECTED) {
      sensors.requestTemperatures();
      data = (sensors.getTempCByIndex(0));
      HTTPClient http;

      http.begin(serverName);
      Serial.println(data);
      http.addHeader("Content-Type", "application/json");

      int httpResponseCode = http.POST("{\"temperature\":"+data+"}");

      Serial.println(httpResponseCode);

      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
