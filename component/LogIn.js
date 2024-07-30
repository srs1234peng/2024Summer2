import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

const LogIn = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogIn = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Log In</Text>
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
            <Button title="Log In" onPress={handleLogIn} />
        </View>
    );

};

export default LogIn;

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