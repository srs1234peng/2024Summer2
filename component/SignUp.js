import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSignUp = async () => {
    // check if email and password are not empty
    if (email === "" || password === "") {
      Alert.alert("Error", "Email and password are required!");
      return;
    }
    if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (password.search(/[a-z]/i) < 0) {
      Alert.alert("Error", "Password must contain at least one letter.");
      return;
    }
    if (email.search(/@/) < 0) {
        Alert.alert("Error", "Email must contain @");
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Success", "User registered successfully");
      navigation.replace("LogIn");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Log In"
        onPress={() => navigation.replace("LogIn")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
  },
});

export default SignUp;
