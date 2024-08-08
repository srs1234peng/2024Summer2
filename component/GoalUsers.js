import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { readAllDocs, writeToDB } from "../Firebase/firestoreHelper";

const GoalUsers = ({ id }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUserData() {
      try {
        //before fetching, check if this user data exists in firestore
        const dataFromFirestore = await readAllDocs(`goals/${id}/users`);
        // console.log(dataFromFirestore.length);
        if (dataFromFirestore.length) {
          setUsers(dataFromFirestore);
          return;
        }

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("The request was not successful");
        }
        // if I get to here means that fetch was successful
        const data = await response.json();
        // write this data to users subcollection
        data.forEach((userData) => {
          //call writeToDB to write a document for this userData
          writeToDB(userData, `goals/${id}/users`);
        });
        setUsers(data);
      } catch (err) {
        console.log("fetch user data ", err);
      }
    }
    fetchUserData();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

export default GoalUsers;

const styles = StyleSheet.create({});