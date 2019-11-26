# Remote-Controller-Streetlights
React Native App to conrol the streetlights at IIIT by making calls to a central server.

This app can be exported to both iOS and Android builds. Request permission before building the app since credentials must be provided in order to control the streetlights.

Expo's version of React Native and the create-react-native-app have been used to create this application. 

## App.js

There is just one component for this relatively simple app, located in App.js
States for manual/auto mode, and on/off have been included and are set upon mounting initially and can be updated on button presses. 

## App.json

This contains data about the app itself including the name, splash screen, and more.
