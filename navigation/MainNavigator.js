import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabNavigator from '../navigation/MainTabNavigator'
import SignUpScreen from "../screens/SignUpScreen";

export default StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        MainTabNavigator: {
            screen: MainTabNavigator,
        },
        SignUpScreen: {
            screen: SignUpScreen,
        },
    },
);
