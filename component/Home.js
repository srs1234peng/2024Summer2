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
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { writeToDB, deleteFromDB } from "../Firebase/firestoreHelper";
import { app } from "../Firebase/firebaseSetup";
import { auth, database } from "../Firebase/firebaseSetup";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Home({ navigation }) {
  // console.log(app); used for testing
  const appName = "Summer 2024 class";
  // const [receivedText, setReceivedText] = useState("");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, "goals"), 
        where("owner", "==", auth.currentUser.uid)
    ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id });
        });
        setGoals(newArray);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  //To receive data add a parameter
  function handleInputData(data) {
    console.log("callback fn called with ", data);
    // if the data contains image url, call the function to upload the image
    if (data.imageUrl) {
      // uploadImage(data.imageUrl);
      imageUrl = retrieveUploadImage(data.imageUrl);
    }
    async function retrieveUploadImage(uri){
      try{
      const response = await fetch(uri);
      console.log("response", response);
      if (!response.ok) {
        console.error("The request was not successful");
      }
      const blob = await response.blob();
      console.log("blob", blob);
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = await ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      console.log("uploadResult", uploadResult.metadata.fullPath);
      return uploadResult.metadata.fullPath;
    }catch(err){
      console.log("retrieve and upload image error", err);
    };
    }

    //define a new object {text:.., id:..}
    //set the text property with the data received
    //set the id property with a random number between 0 and 1
    const newGoal = { text: data.text, owner: auth.currentUser.uid };
    //use updater function when updating the state variable based on existing values
    // add this object to goals array
    // call addToDB function to write to the database
    writeToDB(newGoal, "goals");

    // setReceivedText(data);
    //hide the modal
    setModalVisible(false);
  }
  function dismissModal() {
    setModalVisible(false);
  }

  function handleDeleteGoal(deletedId) {
    // setGoals((currentGoals) => {
    //   return currentGoals.filter((goal) => {
    //     return goal.id !== deletedId;
    //   });
    //});
    deleteFromDB(deletedId, "goals");
    console.log("goal deleted ", deletedId);
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
      {/* <View>
        <Button
          title="Go to Sign In"
          onPress={() => navigation.navigate("LogIn")}
        />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View> */}
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