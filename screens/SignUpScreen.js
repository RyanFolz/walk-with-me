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
    messagingSenderId: "53011519667"
};
console.disableYellowBox = true;

// Get a reference to the database service
const database = firebase.database();

export default class SignUpScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: "Email",
            useremail: "folz.ryan@yahoo.com",
            password: "Password",
            userpw: "password",
            confirmpassword: "password",
            firstname: "First Name",
            userfn: "Ryan",
            lastname: "Last Name",
            userln: "Folz",
            number: 0,
            signedIn: false,
            signInErrorMessage: "",
            phonenumber: "Phone Number",
            userphone: "5025521232",
        };
    }

    static navigationOptions = {
        header: null,
    };

    createUserFromEmail = async () => {
        const  { navigate } = this.props.navigation;


        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.useremail, this.state.userpw);
            console.log("User Created!");

            let user = await firebase.auth().currentUser;
            if (user) {
                let newPostRef = firebase.database().ref('users/').push();

                newPostRef.set({
                    firstName: this.state.userfn,
                    lastName: this.state.userln,
                    phoneNumber: this.state.userphone,
                    userId: firebase.auth().currentUser.uid,
                    createdAt: new Date().getTime(),
                });
            } else {
                // No user is signed in.
                console.log("ERROR: Create User");
            }

            navigate('MainTabNavigator');
        } catch (error) {
            // Handle Errors here.
            console.log("Error Code", error.code);
            console.log("Error Message", error.message);
            // ...
        }
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
                        Create Account
                    </Text>
                    <Text
                        style={{color: "#FF6982", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.firstname}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, textAlign: 'center', width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingHorizontal: 10}}
                        onChangeText={(text) => this.setState({userfn: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userfn}
                        placeholder={"First Name"}>
                    </TextInput>
                    <Text
                        style={{color: "#FF6982", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.lastname}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, textAlign: 'center', width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingHorizontal: 10}}
                        onChangeText={(text) => this.setState({userln: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userln}
                        placeholder={"Last Name"}>
                    </TextInput>
                    <Text
                        style={{color: "#FF6982", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.email}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, textAlign: 'center', width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingHorizontal: 10}}
                        onChangeText={(text) => this.setState({useremail: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.useremail}
                        placeholder={"Email"}>
                    </TextInput>
                    <Text
                        style={{color: "#FF6982", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.password}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, textAlign: 'center', width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingHorizontal: 10}}
                        onChangeText={(text) => this.setState({userpw: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userpw}
                        placeholder={"Password"}>
                    </TextInput>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, textAlign: 'center', width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingHorizontal: 10}}
                        onChangeText={(text) => this.setState({confirmpassword: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.confirmpassword}
                        placeholder={"Confirm Password"}>
                    </TextInput>
                    <Text
                        style={{color: "#FF6982", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.phonenumber}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, textAlign: 'center', width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingHorizontal: 10}}
                        onChangeText={(text) => this.setState({userphone: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userphone}
                        placeholder={"Phone Number"}>
                    </TextInput>
                    <Text
                        style={{color: '#ff7e79', fontSize: 14, height: 15}}>
                        {this.state.signInErrorMessage}
                    </Text>
                    <TouchableOpacity
                        style={{borderRadius: 15, width: 200, height: 30, margin: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}
                        onPress={this.createUserFromEmail}
                        activeOpacity={.6}>
                        <Text
                            style={{color: '#FF6982', fontWeight: 'bold'}}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                    <View style={{height: 40}}/>
                </View>
            </KeyboardAwareScrollView>
        );
    }

}
