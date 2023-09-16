import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import Welcome from "../modules/checklist/screen/welcome/welcome";

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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});