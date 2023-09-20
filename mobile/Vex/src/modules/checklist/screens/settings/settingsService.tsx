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
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 40,
    width,
    borderWidth: 0.4,
    marginTop: 2,
    borderColor: "#162226",
    justifyContent: "center",
    alignItems: "center",
  },
});
