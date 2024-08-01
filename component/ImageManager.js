import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImageManager = () => {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [uri, setUri] = useState(null);

    async function verifyPermissions() {
        console.log(status);
        if (status?.granted) {
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
            if (!result.canceled) {
                const { uri } = result.assets[0];
                setUri(uri);
            }
        } catch (err) {
            console.log("take photos", err);
        }
    }

    return (
        <View>
            <Text>Image Manager</Text>
            <Button title="Take Image" onPress={takeImageHandler} />
            {uri && <Image source={{ uri }} />}
        </View>
    );
};

const styles = StyleSheet.create({
});

export default ImageManager;
