import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PressableButton from './PressableButton';
import { AntDesign } from '@expo/vector-icons';

const GoalItem = ({ goal, deleteHandler, navigation }) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.textStyle}>{goal.text}</Text>
      <View style={styles.Container}>
        <PressableButton 
          componentStyle={styles.buttonStyle}
          pressedFunction={() => deleteHandler(goal.id)} 
        >
          <AntDesign name="delete" size={24} color="black" />
        </PressableButton>
        {/*<PressableButton 
          pressedFunction={() => navigation.navigate('GoalDetails', { goalObj: goal })} 
          componentStyle={styles.navigateButton}
        >
          i
        </PressableButton>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
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
  buttonStyle: {
    backgroundColor: 'blue',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default GoalItem;
