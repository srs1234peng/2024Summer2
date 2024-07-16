import React from 'react';
import Home from './component/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalDetails from './component/GoalDetails';

const Stack = createNativeStackNavigator();
console.log(Stack);

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="GoalDetails" component={GoalDetails}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
