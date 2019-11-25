import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableHighlight
} from 'react-native';

import {
  Button,
  ButtonGroup
} from 'react-native-elements';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      state: 0,
      modalOnVisible: false,
      modalOffVisible: false,
      selectedIndex: 1,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    //Function to change state of the control, function to be added.
    
    this.setState({selectedIndex})
  }

  toggleModalOn(visible) {
    this.setState({
      modalOnVisible: visible,
    })
  }

  toggleModalOff(visible) {
    this.setState({
      modalOffVisible: visible,
    })
  }

  componentDidMount(){
    fetch("https://nishantsachdeva.pythonanywhere.com/ison")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       state: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any

    fetch("https://nishantsachdeva.pythonanywhere.com/isauto")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       selectedIndex: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any

  }

  switchon = () => {
    fetch("https://nishantsachdeva.pythonanywhere.com/switchon")
    .then(response => response.json())
    .catch(error => {
      console.log(error)
    })
    
    this.setState({
      selectedIndex: 0,
      state: 1,
    });

    this.toggleModalOn(true);
  }

  switchoff = () => {
    fetch("https://nishantsachdeva.pythonanywhere.com/switchoff")
    .then(response => response.json())
    .catch(error => {
      console.log(error)
    })
    
    this.setState({
      selectedIndex: 0,
      state: 0,
    });

    this.toggleModalOff(true);
  }

  render() {

    const buttons = ['Manual', 'Auto']
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.textinfo}>This is a remote for the streetlights at IIIT Hyderabad. It works by triggering a function on a central server which communicates with the control box</Text>
        <View style={styles.container}>
          <Button
              title="Switch ON"
              onPress={this.switchon}
              style={styles.buttonon}
          />
        </View>

        {
          this.state.state == 1 ? <Text style={styles.status}>The lights are ON</Text> :  <Text style={styles.status}>The lights are OFF</Text>
        }

        <View style={styles.container} >
          <Button
                title="Switch OFF"
                onPress={this.switchoff}
                type='outline'
                color="black"
            />
        </View>
        
        <View style = {styles.container}>
           <Modal animationType = {"slide"} transparent = {false}
              visible = {this.state.modalOnVisible}>
              
              <View style = {styles.modal}>
                 <Text style = {styles.modalstatus}>Lights are now ON!</Text>
                 <Text style = {styles.modaltext}>Note that manual mode has been switched on and 'Switch-To-Auto' must be clicked to revert to auto mode.</Text>
                 
                 <Button onPress = {() => {
                    this.toggleModalOn(!this.state.modalOnVisible)}}
                    title="Understood!"
                    style={styles.modalbutton}
                  />
              </View>
           </Modal>
        </View>

        <View style = {styles.container}>
           <Modal animationType = {"slide"} transparent = {false}
              visible = {this.state.modalOffVisible}>
              
              <View style = {styles.modal}>
                 <Text style = {styles.modalstatus}>Lights are now OFF!</Text>
                 <Text style = {styles.modaltext}>Note that manual mode has been switched on and 'Switch-To-Auto' must be clicked to revert to auto mode.</Text>
                 
                 <Button onPress = {() => {
                    this.toggleModalOff(!this.state.modalOffVisible)}}
                    title="Understood!"
                    style={styles.modalbutton}
                  />
              </View>
           </Modal>
        </View>

        <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 40}}
      />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 50,
  },
  textinfo: {
    textAlign: 'center',
    marginVertical: 75,
  },
  buttonon: {
    backgroundColor: '#fce205',
  },
  buttonoff: {
    backgroundColor: '#000',
  },
  status: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 50,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 100
  },
  modalstatus: {
    marginTop: 75,
    marginHorizontal: 25,
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modaltext: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 100,
  },
  modalbutton: {
    marginTop: 100,
  }
});
