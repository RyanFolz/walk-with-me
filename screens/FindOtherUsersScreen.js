import React from 'react';
import { Button, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Expo from 'expo';
//import RNFetchBlob from 'react-native-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import Color from '../constants/Colors';

export default class FindChatRoomScreen extends React.Component {

    state = {
        userList: [],
        sendMessage: '',
    };

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        let getDistance = this.getDistanceFromLatLonInKm;
        firebase.database().ref('users/').on('value', (snapshot) => {
            let returnArr = [];
            let idArr = [];
            let i = 0;
            try {
                Object.keys(snapshot.val()).forEach(key => {
                    console.log("Key: " + key);
                    idArr.push(key);
                });
            } catch (error) {
                console.log("ERROR: " + error);
            }
            let myLat = 0;
            let myLong = 0;
            snapshot.forEach(function(item) {
                console.log("Item: " + item);
                if(item.val().userId === firebase.auth().currentUser.uid) {
                    myLat = item.val().latitude;
                    myLong = item.val().longitude;
                }
            });
            snapshot.forEach(function(item) {
                console.log("Item: " + item);
                if(item.val().userId !== firebase.auth().currentUser.uid) {
                    let itemVal = {};
                    itemVal.firstName = item.val().firstName;
                    itemVal.lastName = item.val().lastName;
                    itemVal.latitude = item.val().latitude;
                    itemVal.longitude = item.val().longitude;
                    itemVal.distance = getDistance(itemVal.latitude, itemVal.longitude, myLat, myLong);
                    itemVal.phoneNumber = item.val().phoneNumber;
                    itemVal.userId = item.val().userId;
                    itemVal.createdAt = item.val().createdAt;
                    itemVal.id = idArr[i];
                    returnArr.push(itemVal);
                }
                i++;
            });
            console.log("snapshot", snapshot);
            console.log("returnArr", returnArr);
            this.setState({
                userList: returnArr,
            })
        });
    };

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    renderChatItem = (item) => (
        <View style={{padding: 8}}>
            <Button
                title={item.firstName + " " + item.lastName + ": " + item.distance}
                onPress={() => this.goToSpecificChatPage(item)}/>
        </View>
    );

    goToSpecificChatPage = (item) => {
        const { navigate } = this.props.navigation;

        let newPostRef = firebase.database().ref('chatrooms/').push();
        let currentDate = new Date().getTime();
        let uOne = firebase.auth().currentUser.uid;
        let uTwo = item.userId;

        newPostRef.set({
            createdAt: currentDate,
            messages: null,
            userOne: firebase.auth().currentUser.uid,
            userTwo: item.userId,
        });

        firebase.database().ref('chatrooms/').on('value', (snapshot) => {
            let returnArr = [];
            let idArr = [];
            let i = 0;
            try {
                Object.keys(snapshot.val()).forEach(key => {
                    console.log("Key: " + key);
                    idArr.push(key);
                });
            } catch (error) {
                console.log("ERROR: " + error);
            }
            snapshot.forEach(function(item) {
                let itemVal = {users: {}};
                if(item.val().createdAt === currentDate &&
                    item.val().userOne === uOne &&
                    item.val().userTwo === uTwo){
                    console.log("It worked!");
                    console.log("ChatRoomId: " + idArr[i]);
                    navigate('ChatScreen', {chatRoomId: idArr[i]});
                }

                itemVal.id = idArr[i];
                returnArr.push(itemVal);
                i++;
            });
            console.log("snapshot Chatrooms", snapshot);
            console.log("returnArr Chatrooms", returnArr);
            this.setState({
                messages: returnArr,
            })
        });

    };

    addChatRoom = () => {
        let newPostRef = firebase.database().ref('chatrooms/').push();

        newPostRef.set({
            createdAt: new Date().getTime(),
            messages: null,
            users: null,
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.userList}
                    renderItem={({item}) => this.renderChatItem(item)}
                    onPressItem
                />

            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6E5BAA',
        paddingTop: 20,
    },
    chatContainer: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#6E5BAA'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    sendContainer: {
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    sendLabel: {
        color: '#ffffff',
        fontSize: 15
    },
    input: {
        width: Dimensions.get('window').width - 70,
        color: '#555555',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        height: 32,
        borderColor: '#6E5BAA',
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
});

