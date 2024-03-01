import { View, Text, SafeAreaView, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { horizontalScale } from "../common/style";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = (props) => {
  const [apiData, setApiData] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("APIDATA"));
    if (userData === null || userData === undefined || userData === "") {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          setApiData([...result]);
          await AsyncStorage.setItem("APIDATA", JSON.stringify(result));
        })
        .catch((error) => console.error(error));
    } else {
      setApiData(userData);
    }
  };

  const RenderData = ({ item }) => {
    return (
      <View
        style={{
          marginHorizontal: horizontalScale(20),
          marginVertical: horizontalScale(10),
          borderRadius: horizontalScale(20),
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "#EBDAD7",
            padding: horizontalScale(10),
          }}
        >
          <Text style={{ fontSize: horizontalScale(20), fontWeight: "500" }}>
            Title :
            <Text style={{ fontSize: horizontalScale(18) }}>
              {" "}
              {item?.title}
            </Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#F3F1BF",
            padding: horizontalScale(10),
          }}
        >
          <Text style={{ fontSize: horizontalScale(20), fontWeight: "500" }}>
            Description :
            <Text style={{ fontSize: horizontalScale(15) }}> {item?.body}</Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={apiData}
        renderItem={({ item }) => <RenderData item={item} />}
      />
      <Pressable
        onPress={() => props.navigation.navigate("NewDataAdd")}
        style={{
          height: horizontalScale(50),
          width: horizontalScale(50),
          backgroundColor: "red",
          borderRadius: horizontalScale(25),
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: horizontalScale(20),
          bottom: horizontalScale(20),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: horizontalScale(35),
            color: "#FFF",
          }}
        >
          +
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
