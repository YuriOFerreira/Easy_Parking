import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@hooks/useAuth';

export function App() {
  return (
    <NativeBaseProvider>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
