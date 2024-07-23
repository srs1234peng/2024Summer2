import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  function warningHandler() {
    console.log("warning");
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
  }

  // waits till the render is done and then run the effect function
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
          You are seeing the details of the goal with text :
          {route.params.goalObj.text} and id:{route.params.goalObj.id}
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
    </View>
  );
}
const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});