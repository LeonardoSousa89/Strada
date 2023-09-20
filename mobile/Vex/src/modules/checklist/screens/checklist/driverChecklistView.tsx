import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>checklist visualization driver data</Text>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height,
    alignItems: "center",
    justifyContent: "center",
  },
});
