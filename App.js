import React, { useEffect, useState } from "react";
import { Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Home from "./component/Home";
import GoalDetails from "./component/GoalDetails";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import Profile from "./component/Profile"; // Import Profile component

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
      // options={{ headerRight: () =>{
      //   return (
      //     <PressableButton pressedFunction={}>
      //       <AntDesign name="logout" size={24} color="black" />
      //     </PressableButton>
      //   );
      // } }}
  
    />
  </>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user)
      setIsAuthenticated(true);
      console.log("Authenticated");
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
        {isAuthenticated ? AppStack: AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
