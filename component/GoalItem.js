import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const GoalItem = ({ goal, deleteHandler, navigation }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{goal.text}</Text>
      <View style={styles.buttonContainer}>
        <Button color="black" title="X" onPress={() => deleteHandler(goal.id)} />
        <Button color="black" title="i" onPress={() => navigation.navigate('GoalDetails', { goalObj: goal })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 20,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default GoalItem;
