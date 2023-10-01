import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { TextInput, Button } from "@react-native-material/core";
import { navigator } from "../../controllers/navigate/navigate";

export default (props: any) => {
  function changeDirectoryFromNextStep() {
    navigator(props, "login");
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image_shield}
            source={require("../../../../assets/screens/auth/shield.png")}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.activity}>
            <Image
              style={styles.image_activity}
              source={require("../../../../assets/screens/auth/activity4.png")}
            />
          </View>
          <Text style={styles.step}>Tudo pronto!</Text>
          <Text style={styles.step}>
            Senha recuperada e atualizada com sucesso!
          </Text>
          <View style={styles.subcontainer_form}>
            <Button
              style={styles.btn}
              title="prosseguir"
              color="#162226"
              onPress={changeDirectoryFromNextStep}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

let styles: any = 0;

if (height > 720) {
  styles = StyleSheet.create({
    container: {
      height,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image_shield: {
      marginTop: 150,
      height: 250,
      width: 250,
    },
    image_activity: {
      marginTop: 100,
      marginBottom: 50,
    },
    main: {
      flex: 2,
      padding: 50,
    },
    activity: {
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },
    subcontainer_phrase: {
      marginBottom: 25,
    },
    phrase: {
      fontWeight: "bold",
      color: "#162226",
    },
    step: {
      fontWeight: "bold",
      fontSize: 22,
      color: "#162226",
    },
    subcontainer_form: {
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      height: 150,
    },
    btn: {
      width: "100%",
      marginTop: 10,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image_shield: {
      marginTop: 150,
    },
    image_activity: {
      marginTop: 100,
      marginBottom: 50,
    },
    main: {
      flex: 2,
      padding: 50,
    },
    subcontainer_phrase: {
      marginBottom: 25,
    },
    phrase: {
      fontWeight: "bold",
      color: "#162226",
    },
    step: {
      fontWeight: "bold",
      fontSize: 22,
      color: "#162226",
    },
    subcontainer_form: {
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      height: 150,
    },
    btn: {
      width: "100%",
      marginTop: 10,
    },
  });
}
