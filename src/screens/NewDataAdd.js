import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { horizontalScale, verticalScale } from "../common/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewDataAdd = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("APIDATA"));
    setData([...user]);
  };

  const clickDone = async (title, description) => {
    let paylode = { title: title, body: description };
    data.push(paylode);
    await AsyncStorage.setItem("APIDATA", JSON.stringify(data));
    currect();
  };
  const currect = () => {
    props.navigation.replace("HomeScreen");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        onChangeText={(e) => setTitle(e)}
        value={title}
        placeholder="Enter your Title."
        style={{
          backgroundColor: "pink",
          height: horizontalScale(40),
          width: "90%",
          marginVertical: verticalScale(15),
        }}
      />
      <TextInput
        onChangeText={(pass) => setDescription(pass)}
        value={description}
        placeholder="Enter your Description"
        style={{
          backgroundColor: "pink",
          height: horizontalScale(40),
          width: "90%",
        }}
      />
      <Pressable
        onPress={() => clickDone(title, description)}
        style={{
          backgroundColor: "pink",
          height: horizontalScale(50),
          width: verticalScale(150),
          marginTop: horizontalScale(20),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: verticalScale(20) }}>
          Add Data
        </Text>
      </Pressable>
    </View>
  );
};

export default NewDataAdd;
