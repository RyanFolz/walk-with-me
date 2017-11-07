import React from 'react';
import { Button, Alert, Dimensions, Text, Linking, TextInput, TouchableOpacity, View, } from 'react-native';
import Expo from 'expo';
import Slider from 'react-native-slider';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Constants, Location, Permissions } from 'expo';

import Color from '../constants/Colors';

const config = {
    apiKey: "AIzaSyBwJ13nwPnDVUye_KohZ0tUh3nt6Wnj2yg",
    authDomain: "dog-walker-neu.firebaseapp.com",
    databaseURL: "https://dog-walker-neu.firebaseio.com",
    projectId: "dog-walker-neu",
    storageBucket: "dog-walker-neu.appspot.com",
    messagingSenderId: "52511519667"
};
console.disableYellowBox = true;

// Get a reference to the database service
const database = firebase.database();
export default class SettingsScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: "folz.ryan@yahoo.com",
            password: "password",
            number: 0,
            signedIn: false,
            signInErrorMessage: "",
            distanceRange: 10,
            location: null,
            zipcode: 0,
        };
    }

    static navigationOptions = {

        title: (<View style={{
            width: Dimensions.get("window").width - 80,
            height:50,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 20,}}>
            Settings
            </Text>

        </View>),
    };







    // Example on how to send data to the DataBase
    sendDataToServerExample = async () => {
        console.log("Sending Data to server under ID", firebase.auth().currentUser.uid);

        console.log("Test", this.getButtonClickNumber() + 1);
        await database.ref('users/' + firebase.auth().currentUser.uid).set({
            number: this.getButtonClickNumber() + 1,
        });
    };

    getButtonClickNumber() {
        let userId = firebase.auth().currentUser.uid;
        let number = 79;
        firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            number = Number(snapshot.val().number);
            console.log("number", number);
        });
        return number;
    };


    showAlert = () => {
        Alert.alert(
            'Wait!',
            'Are you sure you want to delete your account?',
                [
                {text: 'Yes', onPress: this.deleteAccount},
                {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
                ]
        )
    }

    //deletes the account
    deleteAccount = async () => {
       try {
           console.log('Yes Pressed');
           let user = firebase.auth().currentUser;
           user.delete();
           Alert.alert(
               'Success',
               'Your account has been deleted. Sorry to see you go :(',
           )
       }catch(error){
           console.log('Error');
           Alert.alert(
               'Error',
               'Your account could not be deleted.',
           )
       }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("Signed out successfully");
            this.setState ({
                signedIn: false,
            });
        }, function(error) {
            // An error happened.
            console.log(error);
        });
    };



    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
        console.log(location);

        try {
            let newPostRef = database.ref('user/' + firebase.auth().currentUser.uid + '/').push();
            newPostRef.set({
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
            });
        } catch (error) {
            console.log(error);
        }

    };

    distanceFromYou = (lat1, lat2, lon1, lon2) => {
        let dlon = lon2 - lon1;
        let  dlat = lat2 - lat1;
        let a = (Math.sin(dlat/2))^2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dlon/2))^2;
        let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a));
        let d = 3961 * c ;
        return d;
    }


checkUsers = () =>{

}


    render() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}>
              <View style={{
                  flex: 1,
                  height: Dimensions.get("window").height,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}>



                  <View style={{flex: 0, alignItems: 'stretch', justifyContent: 'center'}}>

                      <Text>Distance Range: {this.state.distanceRange} Miles</Text>
                      <Slider
                          value={this.state.distanceRange}
                          minimumValue = {0}
                          maximumValue = {100}
                          step = {1}

                          onValueChange={(value) => this.setState({distanceRange: value})}
                             />

                  </View>
                  <TouchableOpacity
                      style={{borderRadius: 0, width: Dimensions.get('window').width, height: 50, margin: 8, marginTop: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4559F2'}}
                      onPress={this.checkUsers}
                      activeOpacity={.5}>
                      <Text
                          style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                          Find Users Near Me!
                      </Text>
                  </TouchableOpacity>




                <TouchableOpacity
                    style={{borderRadius: 0, width: Dimensions.get('window').width, height: 50, margin: 8, marginTop: 104, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4559F2'}}
                    onPress={() => Linking.openURL('https://itunes.apple.com/us/genre/ios/id36?mt=8')}
                    activeOpacity={.5}>
                    <Text
                        style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                        Rate Us
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                      style={{borderRadius: 0, width: Dimensions.get('window').width, height: 50, margin: 8, marginTop: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4559F2'}}
                      onPress={() => Linking.openURL('https://www.facebook.com/')}
                      activeOpacity={.5}>
                      <Text
                          style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                          Share Tinder?
                      </Text>
                </TouchableOpacity>
                <TouchableOpacity
                      style={{borderRadius: 0, width: Dimensions.get('window').width, height: 50, margin: 8, marginTop: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4559F2'}}
                      onPress={this.signOut}
                      activeOpacity={.5}>
                      <Text
                          style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                          Log Out
                      </Text>
                </TouchableOpacity>
                  <TouchableOpacity
                      style={{borderRadius: 0, width: Dimensions.get('window').width, height: 50, margin: 8, marginTop: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4559F2'}}
                      onPress={this.showAlert}
                      activeOpacity={.5}>
                      <Text
                          style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                          Delete Account
                      </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={{borderRadius: 0, width: Dimensions.get('window').width, height: 50, margin: 8, marginTop: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4559F2'}}
                      onPress={this.getLocationAsync}
                      activeOpacity={.5}>
                      <Text
                          style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                          Enable Location Services/ Update Location
                      </Text>
                  </TouchableOpacity>
                <Text
                    style={{color: '#ff7e79', fontSize: 14, height: 18}}>
                    {this.state.signInErrorMessage}
                </Text>

                <View style={{height: 40}}/>
              </View>
            </KeyboardAwareScrollView>
        );
    }

}
