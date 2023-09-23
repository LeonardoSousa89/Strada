import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet } from "react-native";

import ChecklistForm from "../modules/checklist/screens/checklist/checklistForm";
import ChecklistView from "../modules/checklist/screens/checklist/routes/checklistDriverRouteList";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="checklist-form"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2B3640",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 50,
          },
        }}
      >
        <Tab.Screen
          name="checklist-form"
          component={ChecklistForm}
          options={{
            title: "enviar checklist",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="archive-edit"
                    size={30}
                    color={"#2B3640"}
                  />
                );
              }

              return (
                <MaterialCommunityIcons
                  name="archive-edit-outline"
                  size={30}
                  color={"#9BAEBF"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="checklist-view"
          component={ChecklistView}
          options={{
            title: "visualizar checklist",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="book-check"
                    size={30}
                    color={"#2B3640"}
                  />
                );
              }

              return (
                <MaterialCommunityIcons
                  name="book-check-outline"
                  size={30}
                  color={"#9BAEBF"}
                />
              );
            },
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
