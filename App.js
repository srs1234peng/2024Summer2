import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './component/Header';
import React, { useState } from 'react'; // import useState
import Input from './component/Input';

export default function App() {
  const appName = "NewApp";
  const [text, setText] = useState(''); // initialize text state
  return (
    <View style={styles.container}>
      {/* use a prop to pass appName to Header*/}
      <Header name = {appName} theme = "dark"></Header>
      <Text>child1</Text>
      <Text>child2</Text>
      <Input></Input>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
