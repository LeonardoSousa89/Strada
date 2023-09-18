import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import Welcome from "../modules/checklist/screens/welcome/welcome";
import Register from "../modules/checklist/screens/auth/register/signUp";
import Login from "../modules/checklist/screens/auth/login/login";
import WelcomeOrganization from "../modules/checklist/screens/welcome/welcomeOrganization";
import Main from "../modules/checklist/screens/checklist/main";

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="signup" component={Register} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="welcome-organization" component={WelcomeOrganization} />
          <Stack.Screen name="main-menu" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
