import React from 'react';
import { Button, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Expo from 'expo';
//import RNFetchBlob from 'react-native-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import Color from '../constants/Colors';

export default class ChatScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        messages: [],
        sendMessage: '',
        currentDate: this.props.navigation.state.params.currentDate,
        idOne: this.props.navigation.state.params.idOne,
        idTwo: this.props.navigation.state.params.idTwo,
    };

    componentDidMount() {
        console.log(this.props.navigation.state.params);
        let chatRoomId = this.props.navigation.state.params.chatRoomId;

        firebase.database().ref('chatrooms/' + chatRoomId + '/messages/').on('value', (snapshot) => {
            let returnArr = [];
            let i = 0;
            snapshot.forEach(function(item) {
                let itemVal = {user: {}};
                itemVal.text = item.val().message;
                if (item.val().userId === firebase.auth().currentUser.uid) {
                    itemVal.user._id = 1;
                    console.log("Same user");
                } else {
                    itemVal.user._id = (Math.round(Math.random() * 100 + 2));
                    console.log("Not same user");
                }
                itemVal.user.name = item.val().user.name;
                itemVal.createdAt = item.val().createdAt;
                itemVal._id = i;
                returnArr.push(itemVal);
                i++;
            });
            returnArr.reverse();
            console.log("snapshot Messages", snapshot);
            console.log("returnArr Messages", returnArr);
            this.setState({
                messages: returnArr,
            })
        });
    };

    addChat = () => {
        let chatRoomId = this.props.navigation.state.params.chatRoomId;
        console.log("chatroomId: " + chatRoomId);
        let newPostRef = firebase.database().ref('chatrooms/' + chatRoomId + '/messages/').push();

        newPostRef.set({
            message: this.state.sendMessage,
            userId: firebase.auth().currentUser.uid,
            createdAt: new Date().getTime(),
            user: {
                name: firebase.auth().currentUser.email,
            }
        });

        this.setState(() => {
            return {
                sendMessage: '',
            }
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.addChat}
                    text={this.state.sendMessage}
                    onInputTextChanged={(text) => this.setState({sendMessage: text})}
                    user={{
                        _id: 1,
                    }}
                />
                {
                    (Platform.OS === 'android') ?
                        <KeyboardSpacer/>
                        :
                        null
                }

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

