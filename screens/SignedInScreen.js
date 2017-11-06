import React from 'react';
import { Button, Dimensions, Image, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Expo from 'expo';
//import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';
import Color from '../constants/Colors';

export default class SignedInScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            image: null,
        };
    }

    static navigationOptions = {
        header: null,
    };

    pickImage = async () => {
        let result = await Expo.ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
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

    updateInfo = () => {
        // Get a reference to the storage service, which is used to create references in your storage bucket
        let storage = firebase.storage();

        // Create a storage reference from our storage service
        let storageRef = storage.ref();

        console.log(this.state.image);

        let image = new Image();
        image.src = this.state.image;

        let uploadTask = storageRef.child("images/" + "test_image");

        /*uploadTask.put(RNFetchBlob.wrap(this.state.image));

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                let downloadURL = uploadTask.snapshot.downloadURL;
            });
            */

    };

    render() {
        return (
            <View>
                <TextInput
                    style={{borderRadius: 18, backgroundColor: '#FFFFFF', margin: 8, width: 280, height: 36, borderWidth: 1, borderColor: Color.borderGrey, padding: 2, paddingLeft: 10}}
                    onChangeText={(text) => this.setState({email: text})}
                    underlineColorAndroid={Color.transparent}
                    value={this.state.name}>
                </TextInput>
                <TouchableOpacity
                    style={{borderRadius: 18, width: 300, height: 300, margin: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff6982'}}
                    onPress={this.pickImage}
                    activeOpacity={.6}>
                    {(this.state.image !== null) ?
                        <Image
                            source={{ uri: this.state.image }} style={{ width: 280, height: 280, borderRadius: 18, }}
                        />
                        :
                        <Image
                            style={{ width: 280, height: 280, borderRadius: 18, }}>
                        </Image>}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{borderRadius: 18, width: 200, height: 36, margin: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}
                    onPress={this.updateInfo}
                    activeOpacity={.6}>
                    <Text
                        style={{color: '#FF6982', fontWeight: 'bold'}}>
                        Update Info
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

