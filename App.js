import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import GoalDetails from './component/GoalDetails';
import { getHeaderOptions } from './component/Styles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={getHeaderOptions('All My Goals')}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={getHeaderOptions('Goal Details')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
