import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails({ navigation, route }) {
  console.log(route.params);

  return (
    <View style={styles.container}>
        {route.params.goalObj ? (
            <Text style={styles.text}>You are seeing the details of {route.params.goalObj.text}</Text>
        ) : (
            <Text style={styles.text}>More details</Text>
        )}
        <Button title="More details"
        onPress={()=>
            navigation.navigate('GoalDetails', { goalObj: route.params.goalObj })
        }/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});
