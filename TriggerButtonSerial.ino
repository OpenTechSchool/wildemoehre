 
/*
  This example code is in the public domain.

  Author: Bastian Albers
    
 */
//initialize and declare variables
const int buttonPin = 2; //push button attached to this pin
int buttonState = LOW; //this variable tracks the state of the button, low if not pressed, high if pressed
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 200;    // the debounce time; increase if the output flickers
 
 
void setup() {
  Serial.begin(9600);
  //set the mode of the pins...
  pinMode(buttonPin, INPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  //sample the state of the button - is it pressed or not?
  buttonState = digitalRead(buttonPin);
  //filter out any noise by setting a time buffer
  if ( (millis() - lastDebounceTime) > debounceDelay) {
    if (buttonState == HIGH) {
      Serial.println("buttonpress");
      lastDebounceTime = millis(); //set the current time
    }
  }
}
