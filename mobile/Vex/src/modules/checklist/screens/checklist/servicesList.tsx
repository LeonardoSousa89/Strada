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

export default (props: any) => {
  const [orgName, setOrgName]: Array<any> = useState();

  useEffect(() => setOrgName("Log cargo"), []);

  function test() {
    console.warn("pressed");
  }

  function logOut() {
    signOut(props, "login");
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
        <Pressable onPress={test}>
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

if (height > 769) {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
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
  });
}
