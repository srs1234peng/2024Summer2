import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { StatusBar } from 'expo-status-bar';

export default function Home({ navigation }) {
  const appName = "My awesome app";
  
  const [goals, setGoals] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); 

  function handleInputData(data){
    const newGoal = { text: data, id: Math.random().toString() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  }
  
  function handleDeleteGoal(deletedId) {
    setGoals((currentGoals) => currentGoals.filter(goal => goal.id !== deletedId));
  }

  function handlePressGoal(goal) {
    navigation.navigate('GoalDetails', { goalObj: goal });
  }

  const handleCancel = () => {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Header name={appName} theme="dark" />
        </View>
        <Input 
          inputHandler={handleInputData} 
          isModalVisible={modalVisible}
          onCancel={handleCancel}
        />
        <Button 
          title="Add a goal"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.bottomContainer}>
        {goals.length === 0 ? (
          <Text style={styles.textStyle}>Please Add A Goal</Text>
        ) : (
          <FlatList
            data={goals}
            renderItem={({ item }) => (
              <GoalItem 
                goal={item} 
                deleteHandler={handleDeleteGoal} 
                pressHandler={() => handlePressGoal(item)} 
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: 'purple',
    fontSize: 30,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    backgroundColor: '#ddd', 
    borderRadius: 5,
    marginTop: 20,
    padding: 10, 
  },
  topContainer: {
    flex: 2,
    backgroundColor: '#EDE7F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#D1C4E9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
});
