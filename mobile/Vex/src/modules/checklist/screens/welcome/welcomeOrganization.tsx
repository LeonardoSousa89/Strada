import { StyleSheet, View, Image, Text } from "react-native";

export default(props: any) => {
  
  return (
    <View style={styles.container}>
      <Text>welcome organization screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
