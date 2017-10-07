import React from 'react';
import { Button, TextInput,View, } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    doNothing = () => {
        console.log("Button Pressed");
    };

    render() {
        return (
            <View style={{padding: 4}}>
              <TextInput
                  style={{marginTop:40}}>
              </TextInput>
              <TextInput
                  style={{marginTop:40}}>
              </TextInput>
              <Button
                  color={'#000000'}
                  title={'Sign In'}
                  onPress={this.doNothing}>
              </Button>
            </View>
        );
    }
}
