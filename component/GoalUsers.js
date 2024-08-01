import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { writeToDB,readAllDocs } from "../Firebase/firestoreHelper";


const GoalUsers = ({id}) => {
console.log(id)
  const [users, setUsers] = useState([]);

    useEffect(() => { 
        async function fetchUserData() {
            try {
              // before fetching, check if this user data exists in the database
                const dataFromDB = await readAllDocs(`goals/${id}/users`);
                if (dataFromDB.length) {
                    setUsers(dataFromDB);
                    return;
                  }
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users");
                console.log(response);
                if (!response.ok) {
                    throw new Error("The request was not successful");
                }
                const data = await response.json();
                // write this data to users subcollection
                data.forEach((userData) => {
                  // call writeToDB function to write to the database using user id
                  writeToDB(userData, `goals/${id}/users`);
                  console.log(userData);

                });
                setUsers(data);
            } catch (err) {
                console.error("fetch user data,", err);
            }
    }
    fetchUserData();
    }, []);

    return (
        <View>
        <Text>Goal Users</Text>
        <FlatList>
            data={users}
            renderItem={({ item }) => {
                return (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                );
            }}
        </FlatList>
        </View>
    );
};

export default GoalUsers;
