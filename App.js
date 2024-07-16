import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import GoalDetails from './component/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My Awesome App',
            headerStyle: { backgroundColor: 'darkmagenta' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params.goalObj.text,
            headerRight: () => (
              <Button
                title="Warning"
                onPress={() => alert('This is a warning message!')}
                color="blue"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
