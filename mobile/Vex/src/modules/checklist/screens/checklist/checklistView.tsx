import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>visualização de dados do checklist</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
