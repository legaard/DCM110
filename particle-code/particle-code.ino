/* Constants */
const int poten = A0;
const int button = D0;
const int potenPower = A5;

/* State */
String potenState = NULL;
bool isPlaying = false;

void setup() {
  //Setup the pins
  pinMode(poten, INPUT);
  pinMode(potenPower, OUTPUT);
  pinMode(button, INPUT);
  digitalWrite(potenPower, HIGH);

  //Open the serial connection order to print to the console
  Serial.begin(9600);
}

void loop() {
  // Read values for poteniometer and button
  int potenValue = analogRead(poten);
  int buttonValue = digitalRead(button);

  if (buttonValue == HIGH && !isPlaying) {
    Particle.publish("startPause");
    isPlaying = true;
    delay(100);
  }

  if (buttonValue == LOW && isPlaying) {
    Particle.publish("startPause");
    isPlaying = false;
    Serial.println("The controller is laying down");
    delay(100);
  }

  if (potenValue < 500 && potenState != "prev") {
    potenState = "prev";
    Particle.publish("changeSong", potenState);
    Serial.println("Previous song event emitted");
  }

  if (potenValue > 3500 && potenState != "next") {
    potenState = "next";
    Particle.publish("changeSong", potenState);
    Serial.println("Next song event emitted");
  }

  if (potenValue < 3500 && potenValue > 500) {
    potenState = "middle";
  }

  delay(200);
}
