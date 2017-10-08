import React from 'react';
import { Button, TextInput,View, } from 'react-native';
import * as Firebase from 'firebase';

import Color from '../constants/Colors';

const config = {
    apiKey: "AIzaSyBwJ13nwPnDVUye_KohZ0tUh3nt6Wnj2yg",
    authDomain: "dog-walker-neu.firebaseapp.com",
    databaseURL: "https://dog-walker-neu.firebaseio.com",
    //projectId: "dog-walker-neu",
    //storageBucket: "dog-walker-neu.appspot.com",
    messagingSenderId: "52511519667"
};
Firebase.initializeApp(config);

// Get a reference to the database service
const database = Firebase.database();

export default class HomeScreen extends React.Component {

    state = {
        email: "folz.ryan@yahoo.com",
        password: "password",
        number: 0,
    };

    static navigationOptions = {
        header: null,
    };

    createUserFromEmail = () => {
        try {
            Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            console.log("User Created!");
        } catch (error) {
            // Handle Errors here.
            console.log("Error Code", error.code);
            console.log("Error Message", error.message);
            // ...
        }
    };

    isLoggedIn = () => {
        let user = Firebase.auth().currentUser;

        console.log("User", user);

        if (user) {
            // User is signed in.
            console.log("User is signed in");
        } else {
            // No user is signed in.
            console.log("User is not signed in");
        }
    };

    // Example on how to send data to the DataBase
    sendDataToServerExample = () => {
        Firebase.database().ref('users/' + this.state.username).set({
            number: this.state.number
        });
        this.setState((previousState) => {
            return {
                number: previousState.number +1,
            }
        })
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
                    color={'#000000'}
                    title={'Sign In'}
                    onPress={this.createUserFromEmail}>
                </Button>
                <Button
                    color={'#000000'}
                    title={'Is Signed In?'}
                    onPress={this.isLoggedIn}>
                </Button>
            </View>
        );
    }
}
