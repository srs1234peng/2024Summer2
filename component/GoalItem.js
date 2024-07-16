import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const GoalItem = ({ goal, deleteHandler, pressHandler }) => {
  function goalPressed() {
    pressHandler();
  }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{goal.text}</Text>
      <Button color="black" title="X" onPress={() => deleteHandler(goal.id)} />
      <Button color="black" title="I" onPress={goalPressed}/>
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
});

export default GoalItem;
