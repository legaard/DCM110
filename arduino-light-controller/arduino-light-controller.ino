int redPin = 9;
int greenPin = 10;
int bluePin = 11;

int white[3] = {175, 175, 175};
int red[3] = {255, 0, 0};
int green[3] = {0, 255, 0};
int blue[3] = {0, 0, 255};
int yellow[3] = {255, 255, 0};
int turquoise[3] = {0, 255, 255};
int purple[3] = {80, 0, 80};

void setup() {
  //Open a serial communication
  Serial.begin(9600);

  //Setup the pins
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  //Set initial color to "white"
  setColor(white);
}

void loop() {
  if (Serial.available() > 0) {
    int colorPresetNumber = Serial.readString().toInt();

    switch (colorPresetNumber) {
      case 1:
        setColor(red);
        break;
      case 2:
        setColor(green);
        break;
      case 3:
        setColor(blue);
        break;
      case 4:
        setColor(yellow);
        break;
      case 5:
        setColor(turquoise);
        break;
      case 6:
        setColor(purple);
        break;
      case 7:
        pulseLights();
      default:
        setColor(white);
    }
  }
}

void pulseLights() {
  bool shouldKeepPulsing = true;

  while (shouldKeepPulsing) {
    for (int i = 0; i < 175; i++) {
      
      if (Serial.available() > 0 || !shouldKeepPulsing) {
        shouldKeepPulsing = false;
        break;
      }
      
      int color[] {i, i, i};
      setColor(color);
      delay(10);
    }

    for (int i = 175; i > 0; i--) {
      if (Serial.available() > 0 || !shouldKeepPulsing) {
        shouldKeepPulsing = false;
        break;
      }
      
      int color[] {i, i, i};
      setColor(color);
      delay(10);
    }
  }
}

void setColor(int color[]) {
  analogWrite(redPin, color[0]);
  analogWrite(greenPin, color[1]);
  analogWrite(bluePin, color[2]);
}
