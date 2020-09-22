import React from 'react';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import SignIn from './components/auth';
import News from './components/news';
import Article from './components/news/article';
import Games from './components/games';
import GameArticle from './components/games/article';
import Logo from './utils/logo';

const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#001338',
    },
    headerTintColor: 'white',
    headerTitle: Logo,
  },
};

const NewsStack = createStackNavigator(
  {
    News: News,
    Article: Article,
  },
  headerConf,
);

const GameStack = createStackNavigator(
  {
    Games: Games,
    Article: GameArticle,
  },
  headerConf,
);

const AppStack = createBottomTabNavigator(
  {
    News: NewsStack,
    Games: GameStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      showLabel: false,
      activeBackgroundColor: '#00194b',
      inactiveBackgroundColor: '#001338',
      style: {
        backgroundColor: '#001338',
      },
    },
    initialRouteName: 'News',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'News') {
          iconName = `ios-basketball`;
        } else if (routeName === 'Games') {
          iconName = `md-tv`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
  },
  {
    headerMode: 'none',
  },
);

export const RootNavigator = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
      },
      {
        initialRouteName: 'Auth',
      },
    ),
  );
};
