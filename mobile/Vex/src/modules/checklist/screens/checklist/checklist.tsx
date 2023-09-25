import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

import { Pressable } from "@react-native-material/core";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.checklist}>
            <Text>checklist area</Text>
          </View>
          <View style={styles.operations}>
            <Pressable onPress={() => console.warn("delete")}>
              <Image
                style={styles.btn}
                source={require("../../../../assets/screens/checklist/delete_btn.png")}
              />
            </Pressable>
            <Pressable onPress={() => console.warn("share")}>
              <Image
                style={styles.btn}
                source={require("../../../../assets/screens/checklist/share_btn.png")}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

let styles: any = 0;

if (height > 720) {
  styles = StyleSheet.create({
    container: {
      height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    subcontainer: {},
    checklist: {
      flex: 6,
      maxHeight: height,
      width,
    },
    operations: {
      flex: 1,
      flexDirection: "row",
      maxHeight: height,
      width,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    subcontainer: {},
    checklist: {
      flex: 6,
      width,
    },
    operations: {
      flex: 1,
      flexDirection: "row",
      width,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });
}
