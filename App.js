import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Header from './component/Header';
import React, { useState } from 'react';
import Input from './component/Input';
import GoalItem from './component/GoalItem'; // Import GoalItem

export default function App() {
  const appName = "My awesome app";
  
  const [goals, setGoals] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); 

  // to receive data add a parameter
  function handleInputData(data){
    console.log("callback fn called with data: ", data);
    const newGoal = { text: data, id: Math.random().toString() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  }
  
  function handleDeleteGoal(deletedId) {
    // callback function to delete goal
    console.log("Goal deleted.", deletedId);
    setGoals((currentGoals) => currentGoals.filter(goal => goal.id !== deletedId));
  }

  const handleCancel = () => {
    console.log("Cancel button pressed");
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
              <GoalItem goal={item} deleteHandler={handleDeleteGoal} />
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
