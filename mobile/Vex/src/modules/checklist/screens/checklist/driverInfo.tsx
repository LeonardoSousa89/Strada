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


export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text>informações do motorista</Text>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
