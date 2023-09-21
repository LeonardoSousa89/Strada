import React, { useState, useEffect } from "react";
import { Button } from "@react-native-material/core";
import { StyleSheet, View, Image, Text, Dimensions, SafeAreaView } from "react-native";
import { navigation } from "../controllers/navigate/navigate";

export default (props: any) => {
  const [org, setOrg]: Array<any> = useState();

  useEffect(() => setOrg("nome da organização"), []);

  function next(){
    navigation(props, "main-menu")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icon}>
        <Image
          source={require("../../../assets/global/circular_logo.png")}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.paragraph}>Organização</Text>
        <Text style={styles.paragraphParams}>{org}</Text>
      </View>

      <View style={styles.operation}>
        <Button
          style={styles.btn}
          title="prosseguir"
          tintColor="#9BAEBF"
          color="#2B3640"
          onPress={() => next()}
        />
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
  paragraph: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2B3640",
    marginBottom: 5,
  },
  paragraphParams: {
    fontSize: 22,
    color: "#2B3640",
  },
  btn: {},
  icon: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  info: {
    flex: 2,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  operation: {
    flex: 1,
    width: "60%",
  },
});
