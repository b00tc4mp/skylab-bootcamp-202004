// watch board !
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS D4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#define Offset -2.32            //deviation compensate
#define SensorPin A0 
#define VCC2 5

unsigned long int avgValue;  
float b;
int buf[10],temp;
String data;
String ph;

const char* ssid = "skylabCodersAcademy";
const char* password = "skylabRocks";

const char* serverNameTemp = "http://192.168.0.35:8080/api/temperature/123123123";
const char* serverNamePh = "http://192.168.0.35:8080/api/ph/123123123";

unsigned long lastTime = 0;

unsigned long timerDelay = 5000;

void setup() {
  
  sensors.begin();
  Serial.begin(115200);
  pinMode(13,OUTPUT);  
  pinMode(VCC2,OUTPUT);
  digitalWrite(VCC2, HIGH);
  
  

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
     
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

 
}

void loop() {
 
  if ((millis() - lastTime) > timerDelay) {

   


    if (WiFi.status() == WL_CONNECTED) {
      sensors.requestTemperatures();
      data = (sensors.getTempCByIndex(0));
      {
  for(int i=0;i<10;i++)       //Get 10 sample value from the sensor for smooth the value
  { 
    buf[i]=analogRead(SensorPin);
    delay(10);
  }
  for(int i=0;i<9;i++)        //sort the analog from small to large
  {
    for(int j=i+1;j<10;j++)
    {
      if(buf[i]>buf[j])
      {
        temp=buf[i];
        buf[i]=buf[j];
        buf[j]=temp;
      }
    }
  }
  avgValue=0;
  for(int i=2;i<8;i++)                      
    avgValue+=buf[i];
  float phValue=(float)avgValue*5.0/1024/6; 
  ph=3.5*phValue+Offset;  
//     Serial.println(readBattery());
     
  HTTPClient http;

      http.begin(serverNameTemp);
      Serial.println(data);
      http.addHeader("Content-Type", "application/json");

      int httpResponseTemp = http.POST("{\"temperature\":"+data+"}");

      Serial.println(httpResponseTemp);
     
      

      http.begin(serverNamePh);
      Serial.println(ph);
      http.addHeader("Content-Type", "application/json");

      int httpResponsePh = http.POST("{\"ph\":"+ph+"}");

      Serial.println(httpResponsePh);
      Serial.println("WiFi Disconnected");
      http.end();
      
    }
     
    }
    lastTime = millis();
  }
}



//String readBattery(){
//  uint8_t percentage = 100;
//  float voltage = analogRead(A0) / 4096.0 * 4.24;    // Wemos / Lolin D1 Mini 100K series resistor added
//  Serial.println("Voltage = " + String(voltage));
//  percentage = 2808.3808 * pow(voltage, 4) - 43560.9157 * pow(voltage, 3) + 252848.5888 * pow(voltage, 2) - 650767.4615 * voltage + 626532.5703;
//  if (voltage > 4.19) percentage = 100;
//  else if (voltage <= 3.50) percentage = 0;
//  return String(percentage)+"%";
//}




