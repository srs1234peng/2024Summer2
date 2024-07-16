import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalDetails({ navigation, route }) {
  console.log(route.params);

  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are seeing the details of {goal.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});
