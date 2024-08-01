import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, Button, Modal, StyleSheet, Image } from "react-native";
import ImageManager from "./ImageManager";

const Input = ({ inputHandler, isModalVisible, onCancel }) => {
  const [text, setText] = useState("");
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const inputRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);

  const handleConfirm = () => {
    console.log("User typed ", text);
    inputHandler({text, imageUri});
    setText(""); // Clear the input after confirming
    setThankYouVisible(false);
    setIsConfirmDisabled(true);
  };


  function ImageUriHandler(uri){
    console.log("ImageUriHandler called with ", uri);
    setImage(uri);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setText(""); // Clear the input after canceling
    setThankYouVisible(false);
    setIsConfirmDisabled(true);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus the TextInput
    }
  }, [isModalVisible]);

  const handleFocus = () => {
    console.log("Input focused");
    setThankYouVisible(false); // Hide "Thank you" text when input is focused
  };

  const handleBlur = () => {
    console.log("Input blurred with text:", text);
    setThankYouVisible(true); // Show "Thank you" text when input loses focus
  };

  const handleChangeText = (newText) => {
    console.log("Text changed to:", newText);
    setText(newText);
    setThankYouVisible(false); // Hide "Thank you" text when user starts typing
    setIsConfirmDisabled(newText.trim() === ""); // Disable confirm button if text is empty
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            placeholder="Type here"
            value={text}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.input}
          />
          <ImageManager ImageUri={ImageUriHandler}/>
          <Text>You typed: {text}</Text>
          {thankYouVisible && <Text>Thank you</Text>}
          <View style={styles.buttonContainer}>
            <Button
              title="Confirm"
              onPress={handleConfirm}
              disabled={isConfirmDisabled}
            />
            <Button
              title="Cancel"
              onPress={handleCancel}
            />
          </View>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} 
            style={styles.imageStyle} 
            alt="Network Image"
          />
          <Image 
            source={require('../public/wayvsticker.png')} 
            style={styles.imageStyle} 
            alt="Local Image"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'grey',
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default Input;
