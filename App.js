import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './component/Header';
import React, { useState } from 'react'; // import useState
import Input from './component/Input';

export default function App() {
  const appName = "Summer 2024";
  
  const [receivedText, setReceivedText] = useState("initial data"); // initialize data with "initial data"

  // to receive data add a parameter
  function handleInputData(data){
    console.log("callback fn called with data: ", data);
    setReceivedText(data);
  }

  return (
    <View style={styles.container}>
      {/* use a prop to pass appName to Header*/}
      <Header name = {appName} theme = "dark"></Header>
      {/*<Text>child1</Text>*/}
      {/*<Text>child2</Text>*/}
      <Input inputHandler = {handleInputData}/>
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
