import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, Button } from "react-native";

const Input = () => {
  const [text, setText] = useState("");
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const inputRef = useRef();
  function handleConfirm() { console.log("Button pressed")}

  useEffect(() => {
    inputRef.current.focus(); // focus the TextInput
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
    <View>
      <TextInput
        ref={inputRef}
        placeholder="Type here"
        value={text}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Text>
        You typed: {text}
      </Text>
      {thankYouVisible && (
        <Text>Thank you</Text>
      )}
      <Button title = "Confirm" onPress = {() => {
        handleConfirm();}}/>
    </View>
  );
};

export default Input;
