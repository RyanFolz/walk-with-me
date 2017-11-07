import React from 'react';
import { Button, Dimensions, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Expo from 'expo';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Color from '../constants/Colors';

const config = {
    apiKey: "AIzaSyBwJ13nwPnDVUye_KohZ0tUh3nt6Wnj2yg",
    authDomain: "dog-walker-neu.firebaseapp.com",
    databaseURL: "https://dog-walker-neu.firebaseio.com",
    projectId: "dog-walker-neu",
    storageBucket: "dog-walker-neu.appspot.com",
    messagingSenderId: "52511519667"
};
firebase.initializeApp(config);
console.disableYellowBox = true;

// Get a reference to the database service
const database = firebase.database();

export default class HomeScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: "folz.ryan@yahoo.com",
            password: "password",
            number: 0,
            signedIn: false,
            signInErrorMessage: "",
        };
    }

    static navigationOptions = {
        header: null,
    };

    createUserFromEmail = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            console.log("User Created!");
            this.isSignedIn();
        } catch (error) {
            // Handle Errors here.
            console.log("Error Code", error.code);
            console.log("Error Message", error.message);
            // ...
        }
    };


    // Sign a user in with Email and Password.
    signInWithEmailAndPassword = async () => {
        try {
            const { navigate } = this.props.navigation;
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            if (this.isSignedIn()) {
                console.log("AUTHORIZED BITCH");
                navigate('MainTabNavigator');
            } else {
                console.log("UNAUTHORIZED BITCH");
                this.setState({
                    signInErrorMessage: "Unknown Problem",
                });
            }
        } catch (error) {
            // Handle Errors here.
            if (error.code === "auth/invalid-email") {
                this.setState({
                    signInErrorMessage: "Not a valid email",
                });
            } else if (error.code === "auth/user-not-found") {
                this.setState({
                    signInErrorMessage: "That account does not exist"
                })
            } else {
                this.setState({
                    signInErrorMessage: "Unknown Error: " + error.code,
                });
            }
            console.log("Error Code", error.code);
            console.log("Error Message", error.message);
            console.log("UNAUTHORIZED BITCH");
        }
    };

    gotoSettings = () => {
        const { navigate } = this.props.navigation;
        navigate('SettingsScreen');
    };

    // Sees whether or not a User is signed in
    isSignedIn = () => {
        let user = firebase.auth().currentUser;

        console.log("User", user);

        if (user) {
            // User is signed in.
            console.log("User is signed in");
            return true;
        } else {
            // No user is signed in.
            console.log("User is not signed in");
            return false;
        }
    };

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
                    <Text
                        style={{color: '#FF6982', fontWeight: 'bold', marginBottom: 40, fontSize: 40,}}>
                        T I N D E R ?
                    </Text>
                    <TextInput
                        style={{borderRadius: 18, backgroundColor: '#FFFFFF', margin: 8, width: 280, height: 36, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 10}}
                        onChangeText={(text) => this.setState({email: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.email}>
                    </TextInput>
                    <TextInput
                        style={{borderRadius: 18, backgroundColor: '#FFFFFF', margin: 8, width: 280, height: 36, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 10}}
                        onChangeText={(text) => this.setState({password: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.password}>
                    </TextInput>
                    <Text
                        style={{color: '#ff7e79', fontSize: 14, height: 18}}>
                        {this.state.signInErrorMessage}
                    </Text>
                    <TouchableOpacity
                        style={{borderRadius: 18, width: 200, height: 36, margin: 8, marginTop: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF6982'}}
                        onPress={this.signInWithEmailAndPassword}
                        activeOpacity={.6}>
                        <Text
                            style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{borderRadius: 18, width: 200, height: 36, margin: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}
                        onPress={this.createUserFromEmail}
                        activeOpacity={.6}>
                        <Text
                            style={{color: '#FF6982', fontWeight: 'bold'}}>
                            Create an Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{borderRadius: 18, width: 200, height: 36, margin: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}
                        onPress={this.gotoSettings}
                        activeOpacity={.6}>
                        <Text
                            style={{color: '#FF6982', fontWeight: 'bold'}}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                    <View style={{height: 40}}/>
                </View>
            </KeyboardAwareScrollView>
        );
    }

}
