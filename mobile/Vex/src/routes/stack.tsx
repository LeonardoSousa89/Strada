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
import ServicesList from "../modules/checklist/screens/checklist/servicesList";
import ChecklistOperations from "../modules/checklist/screens/checklist/checklistOperations";
import checklistDriverOperationalServices from "../modules/checklist/screens/checklist/checklistDriverOperationalServices";
import checklistOperationalServices from "../modules/checklist/screens/checklist/checklistOperationalServices";
import driverRegister from "../modules/checklist/screens/checklist/driverRegister";
import driverEdit from "../modules/checklist/screens/checklist/driverEdit";
import driverEditOperationalService from "../modules/checklist/screens/checklist/driverEditOperationalService";

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="welcome"
          screenOptions={{ headerShown: false, statusBarColor: "#2B3640" }}
        >
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="signup" component={Register} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen
            name="welcome-organization"
            component={WelcomeOrganization}
          />
          <Stack.Screen name="main-menu" component={Main} />
          <Stack.Screen
            name="services_list"
            component={ServicesList}
            options={{ headerShown: true, headerTitle: "serviços" }}
          />
          <Stack.Screen
            name="checklist-operations"
            component={ChecklistOperations}
            options={{ headerShown: true, headerTitle: "operações" }}
          />
          <Stack.Screen
            name="checklist-driver-operational-services"
            component={checklistDriverOperationalServices}
            options={{
              headerShown: true,
              headerTitle: "serviços do motorista",
            }}
          />
          <Stack.Screen
            name="checklist-operational-services"
            component={checklistOperationalServices}
            options={{
              headerShown: true,
              headerTitle: "serviços do checklist",
            }}
          />
          <Stack.Screen
            name="driver-register"
            component={driverRegister}
            options={{
              headerShown: true,
              headerTitle: "cadastro do motorista",
            }}
          />
          <Stack.Screen
            name="driver-edit"
            component={driverEdit}
            options={{
              headerShown: true,
              headerTitle: "alterar dados do motorista",
            }}
          />
          <Stack.Screen
            name="driver-config"
            component={driverEditOperationalService}
            options={{
              headerShown: true,
              headerTitle: "configurações do motorista",
            }}
          />
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
