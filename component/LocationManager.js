import React, { useState } from "react";
import { Button, StyleSheet, View, Alert, Text, Image } from "react-native";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env"; // Ensure you are using the correct environment variable name

const LocationManager = () => {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();

  async function verifyPermission() {
    console.log(permissionResponse);
    if (permissionResponse?.granted) {
      return true;
    }
    // Ask for permission if not already granted
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  }

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("Permission required", "You need to give permission to access location");
        return;
      }
      const result = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude
      });
      console.log("Location set:", result);
    } catch (err) {
      console.log("Error in getting location", err);
    }
  }

  // Generate the Google Static Map URL
  const generateMapUrl = () => {
    if (!location) return null;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`;
  };

  return (
    <View style={styles.container}>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && (
        <>
          <Text style={styles.locationText}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
          <Image
            style={styles.mapImage}
            source={{ uri: generateMapUrl() }}
          />
        </>
      )}
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
  locationText: {
    marginTop: 20,
    fontSize: 16,
  },
  mapImage: {
    marginTop: 20,
    width: 400,
    height: 200,
  },
});

export default LocationManager;
