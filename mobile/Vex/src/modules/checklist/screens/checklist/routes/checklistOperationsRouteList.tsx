import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { navigate } from "../../../services/navigate/navigate";

export default (props: any) => {

  function driverOperationalRoute(){
    navigate(props, "checklist-driver-operational-services")
  }

  function checklistOperationalRoute(){
    navigate(props, "checklist-operational-services")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_level}>
        <Pressable onPress={driverOperationalRoute}>
          <Image
            source={require("../../../../../assets/screens/checklist/chauffeur.png")}
          />
        </Pressable>
      </View>
      <View style={styles.bottom_level}>
        <Pressable onPress={checklistOperationalRoute}>
          <Image
            source={require("../../../../../assets/screens/checklist/clipboard.png")}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  top_level: {
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 50,
  },
  bottom_level: {
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 50,
    backgroundColor: "#2B3640",
  },
});
