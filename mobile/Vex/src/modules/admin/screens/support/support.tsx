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
        <View>
          <Image
            source={require("../../../../assets/screens/admin/support.png")}
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
