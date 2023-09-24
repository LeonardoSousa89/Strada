import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/stackMainRoute";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
