import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import Loading from "../../../../props/activity/loading";

export default (props: any) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Loading message="excluindo os dados da conta" color="#162226" />
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
  subcontainer: {
    flex: 1,
    width,
  },
});
