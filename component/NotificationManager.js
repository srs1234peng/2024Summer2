import { Button, Text, View, StyleSheet } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
    console.log(response);
    if (response.status === "granted") {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.status === "granted";
  };

const NotificationManager = () => {
  const [response, requestPermission] = Notifications.usePermissions();
  const [notification, setNotification] = React.useState(false);

  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to add notifications");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Add a goal",
          body: "Don't forget to add a goal for today",
          data: { url: "https://www.google.com" },
        },
        trigger: {
          seconds: 10,
        },
      });
      console.log("Notification scheduled");
    } catch (err) {
      console.log("Error in scheduling notification", err);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Remind me to add a goal" onPress={scheduleNotificationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default NotificationManager;
