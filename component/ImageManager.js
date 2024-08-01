import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const ImageManager = (ImageUriHandler) => {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [uri, setUri] = React.useState(null);


    async function verifyPermissions() {
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
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            console.log(result);
            // store the URI from the first item in the assets array
            setUri(result.assets[0].uri);
            imageUriHandler(result.assets[0].uri);
        } catch (err) {
            console.log("take photos", err);
        }
    }
    
    return (
        <View>
            <Text>Image Manager</Text>
            <Button title="Take Image" onPress={takeImageHandler} />
            {uri && <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

const styles = StyleSheet.create({});

export default ImageManager;
