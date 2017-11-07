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
        chatRooms: [],
        sendMessage: '',
    };

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
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
                console.log("Item: " + item);
                let itemVal = {};
                itemVal.title = item.val().title;
                itemVal.createdAt = item.val().createdAt;
                itemVal.id = idArr[i];
                returnArr.push(itemVal);
                i++;
            });
            console.log("snapshot", snapshot);
            console.log("returnArr", returnArr);
            this.setState({
                chatRooms: returnArr,
            })
        });
    };

    renderChatItem = (item) => (
        <View style={{padding: 8}}>
            <Button
                title={item.id}
                onPress={() => this.goToSpecificChatPage(item)}/>
        </View>
    );

    goToSpecificChatPage = (item) => {
        const { navigate } = this.props.navigation;
        console.log("ID Before Pass: " + item.id);
        navigate('ChatScreen', { id: item.id});
    };

    addChatRoom = () => {
        let newPostRef = firebase.database().ref('chatrooms/').push();

        newPostRef.set({
            title: "Chat Room " + Math.random() * 100,
            createdAt: new Date().getTime(),
            messages: null,
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.chatRooms}
                    renderItem={({item}) => this.renderChatItem(item)}
                    onPressItem
                />
                <Button
                    title={"Add Chat"}
                    onPress={this.addChatRoom}/>

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

