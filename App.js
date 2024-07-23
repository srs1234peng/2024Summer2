import React from "react";
import Home from "./component/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./component/GoalDetails";
import { Button, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "darkmagenta" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "All Goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ navigation, route }) => {
            return {
              title: route.params ? route.params.goalObj.text : "Details",
              // headerRight: () => {
              //   return (
              //     <Button
              //       title="Warning"
              //       color="white"
              //       onPress={() => {
              //         console.log("Warning");
              //       }}
              //     />
              //   );
              // },
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}