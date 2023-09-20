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
  ScrollView,
} from "react-native";
import { info } from "../../../../mock/list";

export default (props: any) => {
  const noData: any = "não existem motoristas cadastrados";

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          {Object.keys(info).length ? (
            <View>
              <Image
                source={require("../../../../assets/screens/checklist/worker_card_model.png")}
              />
              <View style={styles.data_container}>
                <Image
                  style={styles.image}
                  source={require("../../../../assets/screens/menu/user_photo.png")}
                />
                <View style={styles.info_container}>
                  <Text style={styles.strong}>nome: </Text>
                  <Text style={styles.data}>{info.name}</Text>
                </View>
                <View style={styles.info_container}>
                  <Text style={styles.strong}>cnh: </Text>
                  <Text style={styles.data}>{info.cnh}</Text>
                </View>
                <View style={styles.info_container}>
                  <Text style={styles.strong}>celular: </Text>
                  <Text style={styles.data}>{info.celphone}</Text>
                </View>
                <View style={styles.info_container}>
                  <Text style={styles.strong}>email: </Text>
                  <Text style={styles.data}>{info.email}</Text>
                </View>
                <View style={styles.info_container}>
                  <Text style={styles.strong}>cep: </Text>
                  <Text style={styles.data}>{info.zipCode}</Text>
                </View>
                <View style={styles.info_container}>
                  <Text style={styles.strong}>estado: </Text>
                  <Text style={styles.data}>{info.state}</Text>
                </View>
                <View style={styles.info_container}>
                  <Text style={styles.strong}>cidade: </Text>
                  <Text style={styles.data}>{info.city}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Image
                source={require("../../../../assets/screens/checklist/worker_card_model.png")}
              />
              <View style={styles.data_container}>
                <Text style={styles.no_data}>{noData}</Text>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
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
  data_container: {
    position: "absolute",
    top: 50,
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 20,
  },
  info_container: {
    flexDirection: "row",
    width: "80%",
  },
  strong: {
    color: "#162226",
    fontWeight: "bold",
    fontSize: 20,
  },
  data: {
    color: "#162226",
    fontSize: 20,
  },
  no_data: {
    color: "#162226",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center"
  }
});