import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  Pressable,
  Image
} from "react-native";
import { checklist, midia } from "../../../../mock/list";
import { CheckList, Midia } from "../../../../props/information/checklist";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.midia}>
          <FlatList
            data={midia}
            renderItem={({ item }) => (
              <Midia typeOfFile={item.typeOfFile} size={item.size} />
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
    midia: {
      flex: 6,
      // backgroundColor: "#f565",
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
      borderWidth: 0.4,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    midia: {
      flex: 4, //não se adapta ao crescimento das informações como
      //   fazem os apps web, tais como: react, html+css+javascript, angular e etc ...
      // backgroundColor: "#f565",
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
      borderWidth: 0.4,
    },
  });
}
