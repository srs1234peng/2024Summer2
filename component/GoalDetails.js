import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const GoalDetails = ({ navigation, route }) => {
  const { goalObj } = route.params;
  const [isWarning, setIsWarning] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: 'red' }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 1 : 0.5,
            backgroundColor: pressed ? 'lightblue' : 'pink',
          },
          styles.pressable,
        ]}
        onPress={() => setIsWarning(!isWarning)}
      >
        {goalObj ? (
          <Text style={[styles.text, isWarning && { color: 'red' }]}>
            You are seeing the details of {goalObj.text} with id of {goalObj.id}
          </Text>
        ) : (
          <Text style={styles.text}>More details</Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : 'blue',
          },
          styles.pressable,
        ]}
        onPress={() => navigation.navigate('GoalDetails', { goalObj })}
      >
        <Text style={styles.pressableText}>More details</Text>
      </Pressable>
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
  pressable: {
    padding: 10,
    margin: 10,
    alignItems: 'center',
    opacity: 0.8,
  },
  pressableText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GoalDetails;
