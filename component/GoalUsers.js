import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

const GoalUsers = () => {

  const [users, setUsers] = useState([]);

    useEffect(() => { 
        async function fetchUserData() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users");
                console.log(response);
                if (!response.ok) {
                    throw new Error("The request was not successful");
                }
                const data = await response.json();
            } catch (err) {
                console.error(err);
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
