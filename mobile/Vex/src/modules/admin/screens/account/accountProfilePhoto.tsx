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
        <Pressable onPress={() => console.warn("click")}>
          <Image
            style={{ marginBottom: 250 }}
            source={require("../../../../assets/screens/admin/user_photo.png")}
          />
        </Pressable>
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
