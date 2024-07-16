import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalDetails = ({ route }) => {
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{goal.text}</Text>
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

export default GoalDetails;
