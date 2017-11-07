import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MainTabNavigator from '../navigation/MainTabNavigator'
import ChatScreen from "../screens/ChatScreen";

export default StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        MainTabNavigator: {
            screen: MainTabNavigator,
        },
        ChatScreen: {
            screen: ChatScreen
        }
        SettingsScreen: {
            screen: SettingsScreen,
        }
    },
    { headerMode: 'none'},
);
