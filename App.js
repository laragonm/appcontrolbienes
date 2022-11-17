/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import {Login} from './src/screens/Login';
import {Inicio} from './src/screens/Home.js';
import Scan from './src/screens/Scanner';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native';
import * as app from './src/screens/global';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    async function checkTokensAndSetNavigation() {
      try {
        const isSignedIn = await AsyncStorage.getItem('isSignedIn');
        app.token = await AsyncStorage.getItem('Token');
        app.usuario = await AsyncStorage.getItem('User');
        app.userID = await AsyncStorage.getItem('useID');

        if (isSignedIn !== null) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        setInitialRoute('Login');
      }
    }

    checkTokensAndSetNavigation();
  }, []);

  return initialRoute !== null ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRoute === 'Login' ? 'Login' : 'Home'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Inicio} />
        <Stack.Screen name="Scanner" component={Scan} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  ) : (
    <ActivityIndicator style={{paddingTop: 450}} size="large" color="#0096d6" />
  );
}
