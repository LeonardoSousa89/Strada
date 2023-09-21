import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet } from "react-native";

import ChecklistForm from "../modules/checklist/screens/checklist/checklistForm";
import ChecklistView from "../modules/checklist/screens/checklist/routes/checklistDriverRouteList";

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="checklist-form"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="checklist-form"
          component={ChecklistForm}
          options={{
            title: "",
          }}
        />
        <Tab.Screen
          name="checklist-view"
          component={ChecklistView}
          options={{
            title: "",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
