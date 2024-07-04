import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './component/Header';

export default function App() {
  const appName = "NewApp";
  return (
    <View style={styles.container}>
      {/* use a prop to pass appName to Header*/}
      <Header name = {appName} theme = "dark"></Header>
      <StatusBar style="auto" />
      <Text>children</Text>
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
