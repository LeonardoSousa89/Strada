import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Image source={require("../../../assets/screens/admin/terms.png")} />
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
  },
});
