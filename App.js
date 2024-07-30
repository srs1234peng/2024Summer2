import React, { useEffect, useState } from "react";
import { Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Home from "./component/Home";
import GoalDetails from "./component/GoalDetails";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import Profile from "./component/Profile";
import { AntDesign } from '@expo/vector-icons'; // Import icons

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="LogIn" component={LogIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: "All Goals",
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Profile')}
            title="Profile"
            color="darkmagenta"
          />
        ),
      })}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params ? route.params.goalObj.text : "Details",
      })}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: "Profile",
        headerRight: () => (
          <Pressable
            onPress={() => {
              signOut(auth).then(() => {
                // Sign-out successful.
                setIsAuthenticated(false);
              }).catch((error) => {
                // An error happened.
                console.error(error);
              });
            }}
            style={{ marginRight: 10 }}
          >
            <AntDesign name="logout" size={24} color="black" />
          </Pressable>
        ),
      })}
    />
  </>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "darkmagenta" },
          headerTintColor: "white",
        }}
      >
        {isAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
