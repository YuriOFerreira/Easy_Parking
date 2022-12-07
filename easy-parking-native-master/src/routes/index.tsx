import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@hooks/useAuth';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { stackPreset } from './presets/stackPreset';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { Home } from '@screens/Home';

export type StackRoutes = {
  HOME: undefined;
  SIGN_IN: undefined;
  SIGN_UP: undefined;
};

const Stack = createStackNavigator<StackRoutes>();

export function Routes() {
  return (
    <NavigationContainer>
      <StatusBar translucent style="dark" />
      <Stack.Navigator screenOptions={stackPreset} initialRouteName="SIGN_IN">
        <Stack.Screen
          name="SIGN_IN"
          component={SignIn}
          options={TransitionPresets.SlideFromRightIOS}
        />

        <Stack.Screen
          name="SIGN_UP"
          component={SignUp}
          options={TransitionPresets.SlideFromRightIOS}
        />

        <Stack.Screen
          name="HOME"
          component={Home}
          options={TransitionPresets.SlideFromRightIOS}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
