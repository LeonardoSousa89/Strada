import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../../../assets/screens/admin/support_card.png")}
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
});
