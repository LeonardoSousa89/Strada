import React, { useState, useEffect } from "react";
import { Button } from "@react-native-material/core";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { navigator } from "../controllers/navigate/navigate";
import { getOrgData } from "../controllers/title/title";
import OrgTitle from "../services/title/title";

export default (props: any) => {
  const [org, setOrg]: Array<any> = useState();
  useEffect(() => {
    organizationName();
  }, [org]);

  function next() {
    navigator(props, "main-menu");
  }
  async function organizationName() {
    let organization = await getOrgData();
    setOrg(
      organization.data.data.data.organization.organization[0].corporate_name
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icon}>
        <Image source={require("../../../assets/global/circular_logo.png")} />
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
