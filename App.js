import React, { useEffect, useState } from "react";
import { Button, Pressable, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Home from "./component/Home";
import GoalDetails from "./component/GoalDetails";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import Profile from "./component/Profile"; // Import Profile component
import Map from "./component/Map"; // Import Map component
import { AntDesign } from '@expo/vector-icons'; // Import icons
import * as Notification from "expo-notifications";

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="LogIn" component={LogIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </>
);

const AppStack = (setIsAuthenticated) => (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: "All Goals",
        headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Profile', { setIsAuthenticated })}
          title="Profile"
          color="darkmagenta"
        >
          <AntDesign name="user" size={24} color="black" />
        </Pressable>
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
      options={({ navigation, route }) => ({
        title: "Profile",
        headerRight: () => (
          <Pressable
            onPress={() => {
              signOut(auth).then(() => {
                // Sign-out successful.
                route.params.setIsAuthenticated(false);
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
    <Stack.Screen name="Map" component={Map} />
  </>
);

Notification.setNotificationHandler({
  handleNotification: async (notification) => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = Notification.addNotificationResponseReceivedListener(
      (notificationResponse) => {
        console.log("notification", notificationResponse.notification.request.content.data.url);
        Linking.openURL(notificationResponse.notification.request.content.data.url);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "darkmagenta" },
          headerTintColor: "white",
        }}
      >
        {isAuthenticated ? AppStack(setIsAuthenticated) : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
