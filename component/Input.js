import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, Button, Modal, StyleSheet } from "react-native";

const Input = ({inputHandler, isModalVisible}) => {
  const [text, setText] = useState("");
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const inputRef = useRef(null);

  const handleConfirm = () => {
    console.log("User typed ", text);
    inputHandler(text);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus the TextInput
    }
  }, []);

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
        <View style={styles.buttonStyle}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: "30%",
    margin: 5,
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transparent: false,
  },
});

export default Input;
