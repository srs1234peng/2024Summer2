import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import ImageManager from "./ImageManager";
import LocationManager from "./LocationManager";

//update Input to receive a prop
const Input = ({ inputHandler, isModalVisible, dismissModal }) => {
  const [text, setText] = useState(""); //source of truth for textinput
  const [blur, setBlur] = useState(false);
  const [imageUri, setImageUri] = useState("");
  function handleConfirm() {
    console.log("user typed ", text);
    //call the received prop callback fn
    // send the image uri as well as the text
    inputHandler({ text, imageUri });
    setText("");
  }
  function handleCancel() {
    // hide the modal
    dismissModal();
    setText("");
  }
  function imageUriHandler(uri) {
    console.log("input ", uri);
    setImageUri(uri);
  }
  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.image}
          />
          <Image source={require("../assets/icon.png")} style={styles.image} />

          <TextInput
            style={styles.input}
            autoFocus={true}
            value={text}
            onChangeText={function (changedText) {
              // console.log("changed :", changedText);
              setText(changedText);
              //this is not updated! setText is asynchronous and will be done in the next render
              // console.log("text ", text);
            }}
            onBlur={() => {
              setBlur(true);
            }}
            onFocus={() => {
              setBlur(false);
            }}
            placeholder="Type something"
            autoCapitalize={true}
          />
          {blur && <Text>Thank you</Text>}
          <ImageManager imageUriHandler={imageUriHandler} />
          <LocationManager />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonView}>
              <Button title="Cancel" onPress={handleCancel} />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                disabled={!text}
                title="Confirm"
                onPress={() => {
                  handleConfirm();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    width: "30%",
    margin: 5,
  },
  buttonsContainer: { flexDirection: "row", alignItems: "center" },

  modalView: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: "10%",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "purple",
    width: "50%",
    padding: 5,
    color: "dodgerblue",
    marginVertical: 10,
  },
  image: { width: 100, height: 100 },
});

export default Input;
