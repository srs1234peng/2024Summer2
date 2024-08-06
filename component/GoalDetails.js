import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { updateDetails } from "../Firebase/firestoreHelper";
import { getDownloadURL, ref } from "firebase/storage";
import GoalUsers from "./GoalUsers";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);

  function warningHandler() {
    console.log("warning");
    setWarning(!warning);
    navigation.setOptions({ title: "Warning!" });
  }
  useEffect(() => {
    async function getImageUrl() {
      if (route.params) {
        const imageUrl = await getImage(route.params.goalObj.id);
        // Do something with the imageUrl, e.g., set it in the state or ref
        const imageRef = ref(storage, imageUrl);
        // If you need to use the imageRef further, you can add your logic here
      }
    }
    getImageUrl();
  }, [route.params]); 

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Warning" color="grey" onPress={warningHandler} />;
      },
    });
  }, [navigation]);

  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          You are seeing the details of the goal with text: {route.params.goalObj.text} and id: {route.params.goalObj.id}
        </Text>
      ) : (
        <Text>More details</Text>
      )}
      <Button
        title="More details"
        onPress={() => {
          navigation.push("Details");
        }}
      />
      {route.params && route.params.goalObj && (
        <GoalUsers id={route.params.goalObj.id} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});
