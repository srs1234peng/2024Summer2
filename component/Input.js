import { Text, TextInput } from "react-native";
import React, { useState } from "react";

const Input = () => {
  const [text, setText] = useState("");
  return (
    <>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here"
        onChangeText={(text) => setText(text)}
        value={text}
        autoCapitalize={true}
      />
      <Text>You just texted:{text}</Text>
    </>
  );
}; 

export default Input;