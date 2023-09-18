import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
} from "react-native";
import { signOut } from "../../controllers/auth/logout";
import { changeScreen } from "../../controllers/navigate/navigate";

export default (props: any) => {
  const [orgName, setOrgName]: Array<any> = useState();

  useEffect(() => setOrgName("Log cargo"), []);

  function test() {
    console.warn("pressed");
  }

  function logOut() {
    signOut(props, "login");
  }

  function changeDirectory() {
    changeScreen(props, "services_list");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.config_area}>
          <Image
            source={require("../../../../assets/screens/menu/user_photo.png")}
          />
          <View style={styles.settings}>
            <Pressable onPress={test}>
              <Image
                style={styles.settings_btn}
                source={require("../../../../assets/screens/menu/gear.png")}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.client_data}>
          <Text style={styles.org_name}>{orgName}</Text>
        </View>
      </View>

      <View style={styles.main}>
        <Pressable onPress={changeDirectory}>
          <Image
            source={require("../../../../assets/screens/menu/services.png")}
          />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_subcontainer}>
          <Pressable onPress={logOut}>
            <Image
              source={require("../../../../assets/screens/menu/logout.png")}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

let styles: any = 0;

if (height > 720) {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    config_area: {
      // backgroundColor: "#000",
      flex: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    settings: {
      position: "absolute",
      top: 100,
      right: 30,
    },
    settings_btn: {},
    client_data: {
      // backgroundColor: "#f54",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    org_name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#162226",
      textDecorationLine: "underline",
    },
    header: {
      // backgroundColor: "#000", //para visualização e testes de layout
      flex: 4,
      width,
    },
    main: {
      // backgroundColor: "#f56", //para visualização e testes de layout
      flex: 3,
      width,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      // backgroundColor: "#000", //para visualização e testes de layout
      flex: 1,
      width,
      alignItems: "center",
    },
    footer_subcontainer: {
      // backgroundColor: "#f489", //para visualização e testes de layout
      justifyContent: "flex-end",
      alignItems: "flex-end",
      height: 50,
      width: "88%",
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    config_area: {
      // backgroundColor: "#000",
      flex: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    settings: {
      position: "absolute",
      top: 40,
      right: 30,
    },
    settings_btn: {},
    client_data: {
      // backgroundColor: "#f54",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    org_name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#162226",
      textDecorationLine: "underline",
    },
    header: {
      // backgroundColor: "#000", //para visualização e testes de layout
      flex: 4,
      width,
    },
    main: {
      // backgroundColor: "#f56", //para visualização e testes de layout
      flex: 3,
      width,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      // backgroundColor: "#000", //para visualização e testes de layout
      flex: 1,
      width,
      alignItems: "center",
    },
    footer_subcontainer: {
      // backgroundColor: "#f489", //para visualização e testes de layout
      justifyContent: "flex-end",
      alignItems: "flex-end",
      height: 50,
      width: "88%",
    },
  });
}
