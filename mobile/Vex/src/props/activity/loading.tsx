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

export default (props: { message: string; color: string }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
      <ActivityIndicator size="large" color={props.color} />
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
    fontWeight: "bold",
  },
});
