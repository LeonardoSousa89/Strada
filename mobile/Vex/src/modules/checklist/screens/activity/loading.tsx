import { ActivityIndicator } from "@react-native-material/core";
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
import { changeScreen } from "../../controllers/navigate/navigate";

export default (props: {
  message: string;
}) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
      <ActivityIndicator size="large" />
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
  text: {
    marginBottom: 50,
    fontSize: 15,
    fontWeight: "bold"
  },
});
