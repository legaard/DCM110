/* Constants */
const int POWER_SLIDER = A5;
const int POWER_BUTTON = A4;
const int POWER_POTEN = A3;

const int SLIDER = A0;
const int BUTTON = A1;
const int POTEN = A2;

const int DELAY_TIME = 500;
const int SLIDER_INTERVAL = 4070 / 6;
const int POTENT_INTERVAL = 4070 / 5;

/* State */
int currentVolume = -1;
int currentLight = -1;
bool isPlaying = true;

void setup() {
  //Setup the pins
  pinMode(POWER_SLIDER, OUTPUT);
  pinMode(POWER_BUTTON, OUTPUT);
  pinMode(POWER_POTEN, OUTPUT);

  pinMode(SLIDER, INPUT);
  pinMode(BUTTON, INPUT);
  pinMode(POTEN, INPUT);

  digitalWrite(POWER_SLIDER, HIGH);
  digitalWrite(POWER_POTEN, HIGH);

  //Open the serial connection order to print to the console
  Serial.begin(9600);
}

void loop() {
  //Read butto and sensors values
  int sliderValue = analogRead(SLIDER);
  int buttonValue = analogRead(BUTTON);
  int potenValue = analogRead(POTEN);

  if (buttonValue > 400) {
    Particle.publish("startPause");
    Serial.println("Emitted play/pause event");
    delay(DELAY_TIME);
  }

  for(int i = 0; i < 6; i++) {
    if (sliderValue > (SLIDER_INTERVAL * i) && sliderValue < (SLIDER_INTERVAL * (i+1)) && currentVolume != i) {
      currentVolume = i;
      Particle.publish("volume", String(currentVolume));
      Serial.println("Volume set to: " + String(currentVolume));
      delay(DELAY_TIME);
    }
  }

  for(int j = 0; j < 5; j++) {
    if (potenValue > (POTENT_INTERVAL * j) && potenValue < (POTENT_INTERVAL * (j+1)) && currentLight != (j+1)) {
      currentLight = j+1;
      Particle.publish("changeLight", String(currentLight));
      Serial.println("Light set to: " + String(currentLight));
      delay(DELAY_TIME);
    }
  }
}
