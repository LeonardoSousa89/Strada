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

{
  /* https://reactnavigation.org/docs/bottom-tab-navigator */
}
{
  /* this file will be bottom tabs navigation(second route)*/
}
export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>checklist operational services list</Text>
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
});
