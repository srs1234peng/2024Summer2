import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { updateDetails } from "../Firebase/firestoreHelper"; // Adjust the path as necessary
import GoalUsers from "./GoalUsers";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);

  async function warningHandler() {
    if (route.params && route.params.goalObj && route.params.goalObj.id) {
      await updateDetails(route.params.goalObj.id, "goals", { warning: true });
      setWarning(true);
      navigation.setOptions({ title: "Warning!" });
    }
  }

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
      <GoalUsers/>
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});
