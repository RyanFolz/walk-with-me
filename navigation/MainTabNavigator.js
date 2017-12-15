import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import Settings from '../screens/SignedInScreen';
import HomeScreen from '../screens/SignedInScreen';
import FindChatRoomScreen from "../screens/FindChatRoomScreen";
import FindOtherUsersScreen from "../screens/FindOtherUsersScreen";

export default TabNavigator(
    {
        Settings: {
            screen: Settings,
        },
        HomeScreen: {
            screen: FindOtherUsersScreen,
        },
        FindChatRoomScreen: {
            screen: FindChatRoomScreen,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Settings':
                        iconName = Platform.OS === 'ios'
                            ? `ios-information-circle${focused ? '' : '-outline'}`
                            : 'md-information-circle';
                        break;
                    case 'HomeScreen':
                        iconName = Platform.OS === 'ios'
                            ? `ios-link${focused ? '' : '-outline'}`
                            : 'md-link';
                        break;
                    case 'FindChatRoomScreen':
                        iconName = Platform.OS === 'ios'
                            ? `ios-options${focused ? '' : '-outline'}`
                            : 'md-options';
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{ marginBottom: -3 }}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true,
    }
);
