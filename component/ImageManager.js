import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const ImageManager = () => {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [uri, setUri] = React.useState(null);


    async function verifyPermissions() {
        console.log(response);
        if (response.granted) {
            return true;
        }
        // If the user has not granted permissions, request them
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
    }

    async function takeImageHandler() {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                Alert.alert("You need to grant camera permissions to use this feature.");

                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            console.log(result);
            // store the URI from the first item in the assets array
            if (!result.canceled) {
                setUri(result.assets[0].uri);
            }
        } catch (err) {
            console.log("take photos", err);
        }
    }
    
    return (
        <View>
            <Text>Image Manager</Text>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default ImageManager;
