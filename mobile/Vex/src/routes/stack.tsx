import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, View } from "react-native";

import Welcome from "../modules/checklist/screens/welcome/welcome";
import Register from "../modules/checklist/screens/auth/register/signUp";
import Login from "../modules/checklist/screens/auth/login/login";
import WelcomeOrganization from "../modules/checklist/screens/welcome/welcomeOrganization";
import Main from "../modules/checklist/screens/checklist/main";
import ServicesList from "../modules/checklist/screens/checklist/servicesList";
import ChecklistOperations from "../modules/checklist/screens/checklist/checklistOperations";
import ChecklistDriverOperationalServices from "../modules/checklist/screens/checklist/checklistDriverOperationalServices";
import TabRoute from "./tabs";
import DriverRegister from "../modules/checklist/screens/checklist/driverRegister";
import DriverEdit from "../modules/checklist/screens/checklist/driverEdit";
import DriverEditOperationalService from "../modules/checklist/screens/checklist/driverEditOperationalService";
import UpdateDriverPassword from "../modules/checklist/screens/auth/checklist/updateDriverPassword";
import DriverUpdateData from "../modules/checklist/screens/checklist/driverUpdateData";
import DriverInfo from "../modules/checklist/screens/checklist/driverInfo";

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <SafeAreaView style={styles.container}>
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
            component={ChecklistDriverOperationalServices}
            options={{
              headerShown: true,
              headerTitle: "serviços do motorista",
            }}
          />
          <Stack.Screen
            name="checklist-operational-services"
            component={TabRoute}
            options={{
              headerShown: true,
              headerTitle: "checklist",
            }}
          />
          <Stack.Screen
            name="driver-register"
            component={DriverRegister}
            options={{
              headerShown: true,
              headerTitle: "cadastro do motorista",
            }}
          />
          <Stack.Screen
            name="driver-edit"
            component={DriverEdit}
            options={{
              headerShown: true,
              headerTitle: "motoristas cadastrados",
            }}
          />
          <Stack.Screen
            name="driver-config"
            component={DriverEditOperationalService}
            options={{
              headerShown: true,
              headerTitle: "configurações do motorista",
            }}
          />
          <Stack.Screen
            name="driver-update-data"
            component={DriverUpdateData}
            options={{
              headerShown: true,
              headerTitle: "alteração de dados do motorista",
            }}
          />
          <Stack.Screen
            name="driver-password-update"
            component={UpdateDriverPassword}
            options={{
              headerShown: true,
              headerTitle: "alteração da senha do motorista",
            }}
          />
          <Stack.Screen
            name="driver-info"
            component={DriverInfo}
            options={{
              headerShown: true,
              headerTitle: "informações do motorista",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
