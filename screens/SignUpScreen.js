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
firebase.initializeApp(config);
console.disableYellowBox = true;

// Get a reference to the database service
const database = firebase.database();

export default class SignUpScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: "Email",
            useremail: "hunt.ni@husky.neu.edu",
            password: "Password",
            userpw: "",
            confirmpassword: "",
            usercp: "",
            firstname: "First Name",
            userfn: "",
            lastname: "Last Name",
            userln: "",
            number: 0,
            signedIn: false,
            signInErrorMessage: "",
            phonenumber: "Phone Number",
            userphone: "",
        };
    }

    static navigationOptions = {
        header: null,
    };


    /* signInWithFacebook = (input1) => {
         return input1;
     };
 */

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
                        style={{color: '#FFFFFF', fontWeight: 'bold', marginBottom: 40, fontSize: 40,}}>
                        Create Account
                    </Text>
                    <Text
                        style={{color: "#C0C0C0", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.firstname}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: 'FFFF00', margin: 6, width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 6}}
                        onChangeText={(text) => this.setState({userfn: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userfn}
                        placeholder={"First Name"}>
                    </TextInput>
                    <Text
                        style={{color: "#C0C0C0", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.lastname}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: 'FF00FF', margin: 6, width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 6}}
                        onChangeText={(text) => this.setState({userln: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userln}
                        placeholder={"Last Name"}>
                    </TextInput>
                    <Text
                        style={{color: "#C0C0C0", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.email}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 10}}
                        onChangeText={(text) => this.setState({useremail: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.useremail}>
                    </TextInput>
                    <Text
                        style={{color: "#C0C0C0", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.password}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '#FFFFFF', margin: 6, width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 6}}
                        onChangeText={(text) => this.setState({userpw: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.userpw}>
                    </TextInput>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: 'FF00FF', margin: 6, width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 6}}
                        onChangeText={(text) => this.setState({confirmpassword: text})}
                        underlineColorAndroid={Color.transparent}
                        value={this.state.confirmpassword}
                        placeholder={"Confirm Password"}>
                    </TextInput>
                    <Text
                        style={{color: "#C0C0C0", fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.phonenumber}
                    </Text>
                    <TextInput
                        style={{borderRadius: 15, backgroundColor: '008000', margin: 6, width: 240, height: 30, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 6}}
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
                        style={{borderRadius: 15, width: 200, height: 30, margin: 6, marginTop: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF6982'}}
                        onPress={this.signInWithEmailAndPassword}
                        activeOpacity={.6}>
                        <Text
                            style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{borderRadius: 15, width: 200, height: 30, margin: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}
                        onPress={this.createUserFromEmail}
                        activeOpacity={.6}>
                        <Text
                            style={{color: '#FF6982', fontWeight: 'bold'}}>
                            Create an Account
                        </Text>
                    </TouchableOpacity>
                    <View style={{height: 40}}/>
                </View>
            </KeyboardAwareScrollView>
        );
    }

}
