import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import { FontAwesome } from "@expo/vector-icons";

const GoalItem = ({ goal, deleteHandler }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.textContainer}>
      <Pressable
        android_ripple={{ color: "pink" }}
        style={({ pressed }) => {
          // if pressed is true return the pressedStyle
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        onPress={function () {
          //pass the goal object back to the parent, Home.js
          // pressHandler(goal);
          navigation.navigate("Details", { goalObj: goal });
        }}
      >
        <Text style={styles.textStyle}>{goal.text}</Text>
        {/* <View style={styles.buttonStyle}> */}
        {/* <Button
            color="black"
            title="X"
            onPress={() => {
              deleteHandler(goal.id);
            }}
          /> */}
        {/* update the pressablebutton to receive the delete function as pressedHandler */}
        <PressableButton
          componentStyle={styles.buttonStyle}
          pressedFunction={() => {
            deleteHandler(goal.id);
          }}
        >
          {/* <Text>X</Text> */}
          <FontAwesome name="trash" size={24} color="black" />
        </PressableButton>
        {/* </View> */}
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  textStyle: {
    color: "darkmagenta",
    fontSize: 25,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#aaa",
  },
  pressedStyle: { opacity: 0.5 },
  textContainer: {
    color: "darkmagenta",
    marginVertical: 15,

    borderRadius: 5,
  },
  buttonStyle: {
    marginLeft: 15,
    backgroundColor: "grey",
    padding: 5,
  },
});