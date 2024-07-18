import React from 'react'; 
import { View, Text, StyleSheet, Pressable } from 'react-native';

const PressableButton = ({ children, pressedFunction, componentStyle }) => {
  return (
    <Pressable 
      onPress={pressedFunction} 
      style={({ pressed }) => [
        componentStyle, 
        pressed && styles.pressStyle
      ]}
    >
      <View>
        <Text style={({ pressed }) => [
          styles.defaultTextStyle, 
          pressed && styles.pressStyleText
        ]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressStyle: {
    opacity: 0.5,
    backgroundColor: 'pink',
  },
  defaultStyle:{
    backgroundColor: 'beige',
    padding: 5,
    margin: 10,
  },
  defaultTextStyle: {
    color: 'white',
    fontSize: 16,
  },
  pressStyleText: {
    color: 'white',
  },
});

export default PressableButton;
