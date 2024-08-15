import { Alert, Button, StyleSheet, Image, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ imageUriHandler }) => {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  async function verifyPermission() {
    console.log(response);
    if (response.granted) {
      return true;
    }
    // what if i don't have permission? let's ask for permission
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function takeImageHandler() {
    // call launchcameraasync and console log the result
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to launch camera");
        return;
      }
      // we will only get to this line if we have permission
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      setImageUri(result.assets[0].uri);
      imageUriHandler(result.assets[0].uri);
      // store the uri from the first item in the assets array
    } catch (err) {
      console.log("take image ", err);
    }
  }
  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {/* use the stored uri to set the source of the image */}
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
};

export default ImageManager;

const styles = StyleSheet.create({ image: { width: 100, height: 100 } });
