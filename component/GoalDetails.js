import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const [imageUri, setImageUri] = useState("");
  function warningHandler() {
    console.log("warning");
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
  }
  useEffect(() => {
    async function getImageUrl() {
      if (route.params) {
        try {
          const url = await getDownloadURL(
            ref(storage, route.params.goalObj.imageUri)
          );
          console.log(url);
          setImageUri(url);
        } catch (err) {
          console.log("get image uri ", err);
        }
      }
    }
    getImageUrl();
  }, []);
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
        <View>
          <Text style={warning && styles.warningStyle}>
            You are seeing the details of the goal with text :
            {route.params.goalObj.text} and id:{route.params.goalObj.id}
          </Text>
          {imageUri && (
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.image}
            />
          )}
        </View>
      ) : (
        <Text>More details</Text>
      )}
      <Button
        title="More details"
        onPress={() => {
          navigation.push("Details");
        }}
      />
      {route.params && <GoalUsers id={route.params.goalObj.id} />}
    </View>
  );
}
const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
  image: { width: 100, height: 100 },
});