import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, View } from "react-native";

import Welcome from "../modules/welcome/screens/animation/welcome";
import Register from "../modules/auth/screens/register/signUp";
import Login from "../modules/auth/screens/login/login";
import WelcomeOrganization from "../modules/welcome/screens/welcomeOrganization";
import Main from "../modules/admin/screens/main/main";
import ServicesList from "../modules/checklist/screens/checklist/routes/vexRouteList";
import ChecklistOperations from "../modules/checklist/screens/checklist/routes/checklistOperationsRouteList";
import ChecklistDriverOperationalServices from "../modules/checklist/screens/checklist/routes/driverRouteList";
import TabRoute from "./tabs";
import DriverRegister from "../modules/checklist/screens/checklist/driverRegister";
import DriverEdit from "../modules/checklist/screens/checklist/routes/driverEditRouteList";
import DriverEditOperationalService from "../modules/checklist/screens/checklist/routes/driverEditOperationalRouteList";
import UpdateDriverPassword from "../modules/checklist/screens/checklist/auth/updateDriverPassword";
import DriverUpdateData from "../modules/checklist/screens/checklist/driverUpdateData";
import DriverInfo from "../modules/checklist/screens/checklist/driverInfo";
import DriverChecklistView from "../modules/checklist/screens/checklist/driverChecklistView";
import DriverDateChecklistView from "../modules/checklist/screens/checklist/routes/driverDateRouteList";
import DriverChecklistMidiaView from "../modules/checklist/screens/checklist/driverChecklistMidiaView";
import ChecklistInfo from "../modules/checklist/screens/checklist/routes/checklistInfoRouteList";
import ConfigurationSettingsList from "../modules/admin/screens/settings/routes/configurationSettingsRouteList";
import Support from "../modules/admin/screens/support/support";
import AccountRouteList from "../modules/admin/screens/account/route/accountRouteList";
import Account from "../modules/admin/screens/account/account";
import Plans from "../modules/payment/screens/plans/plans";
import TerminateAccount from "../modules/admin/screens/account/terminateAccount";
import TermsAndPolicies from "../modules/doc/screens/termsAndPolicies";

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
          <Stack.Screen
            name="driver-checklist-view"
            component={DriverChecklistView}
            options={{
              headerShown: true,
              headerTitle: "checklist do motorista",
            }}
          />
          <Stack.Screen
            name="driver-checklist-midia-view"
            component={DriverChecklistMidiaView}
            options={{
              headerShown: true,
              headerTitle: "midias do motorista",
            }}
          />
          <Stack.Screen
            name="driver-checklist-date"
            component={DriverDateChecklistView}
            options={{
              headerShown: true,
              headerTitle: "data de anotação do checklist",
            }}
          />
          <Stack.Screen
            name="driver-checklist-info"
            component={ChecklistInfo}
            options={{
              headerShown: true,
              headerTitle: "dados de checklist",
            }}
          />
          <Stack.Screen
            name="settings-list"
            component={ConfigurationSettingsList}
            options={{
              headerShown: true,
              headerTitle: "serviços de configuração",
            }}
          />
          <Stack.Screen
            name="support"
            component={Support}
            options={{
              headerShown: true,
              headerTitle: "suporte",
            }}
          />
          <Stack.Screen
            name="account-list"
            component={AccountRouteList}
            options={{
              headerShown: true,
              headerTitle: "serviços da conta",
            }}
          />
          <Stack.Screen
            name="account"
            component={Account}
            options={{
              headerShown: true,
              headerTitle: "conta",
            }}
          />
          <Stack.Screen
            name="plans"
            component={Plans}
            options={{
              headerShown: true,
              headerTitle: "planos",
            }}
          />
          <Stack.Screen
            name="terminate-account"
            component={TerminateAccount}
            options={{
              headerShown: true,
              headerTitle: "encerrar conta",
            }}
          />
          <Stack.Screen
            name="terms-and-policies"
            component={TermsAndPolicies}
            options={{
              headerShown: true,
              headerTitle: "termos de uso e politica de privacidade",
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
