import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import { Provider } from "react-redux";
import { store } from "../../store";
import LoginScreen from "../../screens/LoginScreen";
import NewDataAdd from "../../screens/NewDataAdd";
import { DeviceEventEmitter } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainNavigation = () => {
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    checkUser();
    DeviceEventEmitter.addListener("auth", () => {
      checkUser();
    });
  }, []);

  const checkUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("authData"));
    setuserData(user == null ? "" : user);
  };
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      {userData !== null && (
        <NavigationContainer>
          <Stack.Navigator>
            {userData == "" ? (
              <Stack.Screen
                name="LoginScreen"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
            ) : (
              <>
                <Stack.Screen
                  name="HomeScreen"
                  options={{ headerShown: false }}
                  component={HomeScreen}
                />
                <Stack.Screen
                  name="NewDataAdd"
                  options={{ headerShown: false }}
                  component={NewDataAdd}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Provider>
  );
};

export default MainNavigation;
