import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet } from "react-native";

import vexPlans from "../modules/payment/screens/plans/plans";
import myVexPlan from "../modules/payment/screens/plans/myPlan";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="my-plan"
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
          name="my-vex-plan"
          component={myVexPlan}
          options={{
            title: "meus planos",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="shopping"
                    size={30}
                    color={"#2B3640"}
                  />
                );
              }

              return (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={30}
                  color={"#9BAEBF"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="vex-plans"
          component={vexPlans}
          options={{
            title: "planos",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="store"
                    size={30}
                    color={"#2B3640"}
                  />
                );
              }

              return (
                <MaterialCommunityIcons
                  name="store-outline"
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
