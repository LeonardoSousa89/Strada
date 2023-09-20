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
  props: any;
  path: string;
  message: string;
  duration?: number;
}) => {
  function go() {
    if (props.duration) {
      setTimeout(function () {
        changeScreen(props.props, props.path);
      }, props.duration);
    } else {
      changeScreen(props.props, props.path);
    }
  }

  go();

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
    marginBottom: 20,
  },
});
