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
import { navigator } from "../../../controllers/navigate/navigate";

export default (props: any) => {
  function drivers() {
    navigator(props, "drivers");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Pressable onPress={drivers}>
          <Image
          style={styles.image}
            source={require("../../../../../assets/screens/checklist/notebook.png")}
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
  subcontainer: {
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  image: {
    height: 229,
    width: 229
  }
});
