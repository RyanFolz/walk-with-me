import React from 'react';
import { Button, TextInput,View, } from 'react-native';
import Expo from 'expo';
import * as firebase from 'firebase';

import Color from '../constants/Colors';

const config = {
    apiKey: "AIzaSyBwJ13nwPnDVUye_KohZ0tUh3nt6Wnj2yg",
    authDomain: "dog-walker-neu.firebaseapp.com",
    databaseURL: "https://dog-walker-neu.firebaseio.com",
    //projectId: "dog-walker-neu",
    //storageBucket: "dog-walker-neu.appspot.com",
    messagingSenderId: "52511519667"
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

let id = "";


export default class HomeScreen extends React.Component {

    state = {
        email: "folz.ryan@yahoo.com",
        password: "password",
        number: 0,
        signedIn: false,
    };


    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState = () => {
                        return {
                            signedIn: true,
                        }
                    };
                } else {
                    this.setState = () => {
                        return {
                            signedIn: false
                        }
                    };
                }
                console.log("onAuthStateChanged Called");
                try {
                    console.log("SignedIn", this.state.signedIn);
                } catch (error) {
                    console.log(error);
                }
            }
        );
        this.isSignedIn();
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
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log("User Signed In");
            this.isSignedIn();
        } catch (error) {
            // Handle Errors here.
            console.log("Error Code", error.code);
            console.log("Error Message", error.message);
        }
    };

    // Sees whether or not a User is signed in
    isSignedIn = () => {
        let user = firebase.auth().currentUser;

        console.log("User", user);

        if (user) {
            // User is signed in.
            console.log("User is signed in");
            // Set state to the proper uid and email.
        } else {
            // No user is signed in.
            console.log("User is not signed in");
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

    getButtonClickNumber = () => {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            let number = Number(snapshot.val().number);
            console.log("number", number);
            return number;
        });
    };

    render() {
        return (
            <View style={{padding: 4, justifyContent: 'center', alignItems: 'center',}}>
                <TextInput
                    style={{margin: 8, width: 250, borderWidth: 1, borderColor: Color.borderGrey, padding: 2}}
                    onChangeText={(text) => this.setState({email: text})}
                    underlineColorAndroid={Color.transparent}
                    value={this.state.email}>
                </TextInput>
                <TextInput
                    style={{margin: 8, width: 250, borderWidth: 1, borderColor: Color.borderGrey, padding: 2}}
                    onChangeText={(text) => this.setState({password: text})}
                    underlineColorAndroid={Color.transparent}
                    value={this.state.password}>
                </TextInput>
                <Button
                    style={{width: 200}}
                    color={'#FF6982'}
                    title={'Create User'}
                    onPress={this.createUserFromEmail}>
                </Button>
                <Button
                    style={{width: 200}}
                    color={'#FF6982'}
                    title={'Is Signed In?'}
                    onPress={this.isSignedIn}>
                </Button>
                <Button
                    style={{width: 200}}
                    color={'#FF6982'}
                    title={'Add 1'}
                    onPress={this.sendDataToServerExample}>
                </Button>
                <Button
                    style={{width: 200}}
                    color={'#FF6982'}
                    title={'Sign In With Email and Password'}
                    onPress={this.signInWithEmailAndPassword}>
                </Button>
                <Button
                    style={{width: 200}}
                    color={'#FF6982'}
                    title={'Sign out'}
                    onPress={this.signOut}>
                </Button>
                <Button
                    style={{width: 200}}
                    color={'#FF6982'}
                    title={'Get Click'}
                    onPress={this.getButtonClickNumber}>
                </Button>
            </View>
        );
    }
}
