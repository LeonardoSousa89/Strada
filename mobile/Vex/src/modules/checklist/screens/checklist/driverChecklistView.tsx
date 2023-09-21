import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { checklist, midia } from "../../../../mock/list";
import { CheckList, Midia } from "../../../../props/information/checklist";
import { Pressable } from "@react-native-material/core";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.checklist}>
          <FlatList
            data={checklist}
            renderItem={({ item }) => (
              <CheckList
                recordedBy={item.recordedBy}
                cnh={item.cnh}
                initialKm={item.initialKm}
                plate={item.plate}
                dateFromRecord={item.dateFromRecord}
                notes={item.notes}
              />
            )}
            keyExtractor={(item) => item.id}
          />
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
    checklist: {
      flex: 6,
      maxHeight: height,
      //   backgroundColor: "#f56",
      width,
    },
    operations: {
      flex: 1,
      flexDirection: "row",
      maxHeight: height,
      width,
      alignItems: "center",
      justifyContent: "space-evenly",
      borderWidth: 0.4,
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
    checklist: {
      flex: 6, //não se adapta ao crescimento da tela em função das
      //    informações como fazem os apps web, tais como:
      // react, html+css+javascript, angular e etc ...
      //   backgroundColor: "#f56",
      width,
    },
    operations: {
      flex: 1, //não se adapta ao crescimento da tela em função das
      //    informações como fazem os apps web, tais como:
      // react, html+css+javascript, angular e etc ...
      flexDirection: "row",
      width,
      alignItems: "center",
      justifyContent: "space-evenly",
      borderWidth: 0.4,
    },
  });
}
