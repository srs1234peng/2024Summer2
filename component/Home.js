import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";

export default function Home({ navigation }) {
  const appName = "Summer 2024 class";
  // const [receivedText, setReceivedText] = useState("");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //To receive data add a parameter
  function handleInputData(data) {
    console.log("callback fn called with ", data);
    //define a new object {text:.., id:..}
    //set the text property with the data received
    //set the id property with a random number between 0 and 1
    const newGoal = { text: data, id: Math.random() };
    //use updater function when updating the state variable based on existing values
    setGoals((currentGoals) => {
      return [...currentGoals, newGoal];
    });
    // add this object to goals array

    // setReceivedText(data);
    //hide the modal
    setModalVisible(false);
  }
  function dismissModal() {
    setModalVisible(false);
  }

  function handleDeleteGoal(deletedId) {
    console.log("goal deleted ", deletedId);
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => {
        return goal.id !== deletedId;
      });
    });
  }
  //   function handlePressGoal(pressedGoal) {
  //     console.log("goal pressed ", pressedGoal);
  //     //navigate to Details page and pass the goal object to it
  //     navigation.navigate("Details", { goalObj: pressedGoal });
  //   }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {/* use a prop to pass appName to Header */}
        <Header name={appName} theme="dark" />
        {/* update Add a goal Button to be rendered using the new PressableButton component */}
        {/* <Button
          title="Add a goal"
          onPress={() => {
            setModalVisible(true);
          }}
        /> */}
        <PressableButton
          pressedFunction={() => {
            setModalVisible(true);
          }}
          componentStyle={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Add a goal</Text>
        </PressableButton>
      </View>
      {/* <Text>Child 1</Text> */}
      {/* <Text>Child 2</Text> */}
      {/* </Header> */}
      <Input
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      {/* use the state variable to render the received data */}
      <View style={styles.bottomContainer}>
        {goals.length === 0 ? (
          <Text style={styles.textStyle}>Please Add a Goal</Text>
        ) : (
          <FlatList
            renderItem={({ item }) => {
              return (
                <GoalItem
                  goal={item}
                  deleteHandler={handleDeleteGoal}
                  //   pressHandler={handlePressGoal}
                />
              );
            }}
            data={goals}
          />
          // <ScrollView>
          // {goals.map((goalObj) => {
          //   console.log(goalObj);
          //   return (
          //     <View key={goalObj.id} style={styles.textContainer}>
          //       <Text style={styles.textStyle}>{goalObj.text}</Text>
          //     </View>
          //   );
          // })}
          // </ScrollView>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "darkmagenta",
    fontSize: 25,
  },
  textContainer: {
    color: "darkmagenta",
    backgroundColor: "#aaa",
    marginVertical: 15,

    padding: 15,
    borderRadius: 5,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: "center",
  },
  buttonStyle: {
    borderRadius: 5,
    padding: 10,
  },
});