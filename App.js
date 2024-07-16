import { Text, View } from 'react-native';
import React, { useState } from 'react';
import Home from './component/Home';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
  <NavigationContainer>
    <Home/>
  </NavigationContainer>
  );
}
