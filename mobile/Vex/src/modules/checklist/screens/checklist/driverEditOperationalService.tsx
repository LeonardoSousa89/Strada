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
import { ServiceList } from "../../props/navigationMenu/serviceList";
import { list } from "../../entities/ListOfServices/checklist/driverUpdate/list";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={ list }
          renderItem={({ item }) => (
            <ServiceList props={props} path={item.path} name={item.name} />
          )}
          keyExtractor={(item) => item.id}
        />
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
  list: {
    flex: 1,
  },
});
