import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Button } from "react-native";
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Map = ({chooseLocationHandler}) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <>
        <MapView>
            style={styles.map}
            initialRegion={initialRegion}
            onPress={(e) => {
                setSelectedLocation({
                latitude:e.nativeEvent.coordinate.latitude,
                longitude:e.nativeEvent.coordinate.longitude
            });
            }}
            <Marker
                coordinate={selectedLocation}
                title="Selected Location"
            />
        </MapView>
        <Button title="Choose Location" onPress={chooseLocationHandler} />

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default Map;
