import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <Image
            source={require("../../../../assets/screens/menu/user_photo.png")}
          />
          <Image
            source={require("../../../../assets/screens/admin/card_org_mock.png")}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  subcontainer: {
    height: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
