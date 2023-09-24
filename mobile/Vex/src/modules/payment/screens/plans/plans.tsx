import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
} from "react-native";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../../../assets/screens/admin/promo1.png")}
        />
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
