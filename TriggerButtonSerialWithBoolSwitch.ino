 
/*
  This example code is in the public domain.

  Author: Bastian Albers
    
 */
//initialize and declare variables
const int buttonPin = 2; //push button attached to this pin
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 200;    // the debounce time; increase if the output flickers

int buttonState = HIGH; //this variable tracks the state of the button, low if not pressed, high if pressed
const int ledPin = 13; //led attached to this pin
int ledState = 1; //this variable tracks the state of the LED, negative if off, positive if on

 
void setup() {
  Serial.begin(9600);
  //set the mode of the pins...
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  // initialize the digital pin as an output.
  pinMode(speaker, OUTPUT);     
}

// the loop routine runs over and over again forever:
void loop() {
  //sample the state of the button - is it pressed or not?
  buttonState = digitalRead(buttonPin);
  //filter out any noise by setting a time buffer
  if ( (millis() - lastDebounceTime) > debounceDelay) {
    Serial.println("buttonpress");
    
    if ( (buttonState == HIGH) && (ledState < 0) ) {
      digitalWrite(ledPin, HIGH); //turn LED on
      ledState = -ledState; //now the LED is on, we need to change the state
    }
    else if ( (buttonState == HIGH) && (ledState > 0) ) {
      digitalWrite(ledPin, LOW); //turn LED off
      ledState = -ledState; //now the LED is off, we need to change the state
    }
    
    lastDebounceTime = millis(); //set the current time
  }
  
}
