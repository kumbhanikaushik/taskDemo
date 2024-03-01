import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  DeviceEventEmitter,
} from "react-native";
import React, { useState } from "react";
import { horizontalScale, verticalScale } from "../common/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickDone = async (emailData, passwordData) => {
    const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
    if (emailPattern.test(emailData)) {
      let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/;
      if (!passwordData) {
        Alert.alert("Please Enter Password", "password");
      } else if (passwordData.length < 8) {
        Alert.alert("Password Length Minimum 8 Character Maximum 16");
      } else if (!passwordData.match(check)) {
        Alert.alert(
          "Password should have atleast 1 UpperCase, LowerCase & Special Character Allowed(!@#$*)"
        );
      } else {
        try {
          await AsyncStorage.setItem(
            "authData",
            JSON.stringify([emailData, passwordData])
          );
          DeviceEventEmitter.emit("auth");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      Alert.alert("Please enter a valid email address.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        onChangeText={(e) => setEmail(e)}
        value={email}
        placeholder="Enter your email."
        style={{
          backgroundColor: "pink",
          height: horizontalScale(40),
          width: "90%",
          marginVertical: verticalScale(15),
        }}
      />
      <TextInput
        onChangeText={(pass) => setPassword(pass)}
        value={password}
        placeholder="Password"
        style={{
          backgroundColor: "pink",
          height: horizontalScale(40),
          width: "90%",
        }}
      />
      <Pressable
        onPress={() => clickDone(email, password)}
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
          Done
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
