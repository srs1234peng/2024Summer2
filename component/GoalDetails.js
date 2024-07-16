import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails({ navigation, route }) {
  const { goalObj } = route.params;
  const [isWarning, setIsWarning] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => {
            setIsWarning(true);
            navigation.setOptions({ title: 'Warning!' });
          }}
          color="white"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {goalObj ? (
        <Text style={[styles.text, isWarning && { color: 'red' }]}>
          You are seeing the details of {goalObj.text} with id of {goalObj.id}
        </Text>
      ) : (
        <Text style={styles.text}>More details</Text>
      )}
      <Button
        title="More details"
        onPress={() =>
          navigation.navigate('GoalDetails', { goalObj })
        }
      />
    </View>
  );
}

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
