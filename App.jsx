import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StatusBar, Platform, Easing} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Screens/Home/Home';
import CustomerInfo from './Screens/CreateQuote/CustomerInfo';
import Manager from './Screens/CreateQuote/Manager';
import ShowPdf from './Screens/CreateQuote/ShowPdf';
import {CustomerProvider} from './Screens/Utils/CustomerContext';
import CarSelect from './Screens/CreateQuote/CarSelect';
import ViewPdf from './Screens/Home/ViewPdf';
import SplashScreen from 'react-native-splash-screen';

StatusBar.setBackgroundColor('#fff');
StatusBar.setBarStyle('dark-content');

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 0,
    easing: Easing.linear,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 0,
    easing: Easing.linear,
  },
};

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <CustomerProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            gestureEnabled: true,
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CustomerInfo"
            component={CustomerInfo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Manager"
            component={Manager}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CarSelect"
            component={CarSelect}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShowPdf"
            component={ShowPdf}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewPdf"
            component={ViewPdf}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CustomerProvider>
  );
}

export default App;
