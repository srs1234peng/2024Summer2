import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, Button, Modal, StyleSheet, Image } from "react-native";

const Input = ({ inputHandler, isModalVisible, onCancel }) => {
  const [text, setText] = useState("");
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const inputRef = useRef(null);

  const handleConfirm = () => {
    console.log("User typed ", text);
    inputHandler(text);
    setText(""); // Clear the input after confirming
  };

  const handleCancel = () => {
    onCancel();
    setText(""); // Clear the input after canceling
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
    // Hide "Thank you" text when user starts typing
    setThankYouVisible(false);
    setIsConfirmDisabled(newText.trim() === ""); // Disable confirm button if text is empty
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} style={styles.modalStyle}>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          placeholder="Type here"
          value={text}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
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
          source={require("D:/learning/code/CS5520/2024Summer2/public/1.svg")} 
          style={styles.imageStyle} 
          alt="Local Image"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transparent: false,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default Input;
