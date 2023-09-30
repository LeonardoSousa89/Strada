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
import { navigate } from "../../../checklist/services/navigate/navigate";

export default (props: any) => {
  function changeDirectoryFromNextStep() {
    navigate(props, "recovery-proceed");
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../../../../assets/screens/auth/key-chain.png")}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.subcontainer_phrase}>
            <Text style={styles.phrase}>Esqueceu sua senha?</Text>
            <Text style={styles.phrase}>
              Siga estes passos para que possamos, recuperar sua senha!
            </Text>
          </View>
          <View style={styles.activity}>
            <Image
              source={require("../../../../assets/screens/auth/activity3.png")}
            />
          </View>
          <Text style={styles.step}>
            3 - insira sua nova senha, repita e confirme a escolha!
          </Text>
          <View style={styles.subcontainer_form}>
            <TextInput
              variant="standard"
              label="nova senha"
              color="#162226"
              style={{ margin: 16, width: "100%" }}
            />
            <TextInput
              variant="standard"
              label="confirmar nova senha"
              color="#162226"
              style={{ margin: 16, width: "100%" }}
            />
            <Button
              style={styles.btn}
              title="confirmar"
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
    image: {
      marginTop: 50,
      height: 250,
      width: 250,
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
      marginTop: 25,
      fontWeight: "bold",
      color: "#162226",
    },
    subcontainer_form: {
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      height: 300,
    },
    btn: {
      width: "100%",
      marginTop: 10,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 100,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      marginTop: 50,
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
      marginTop: 25,
      fontWeight: "bold",
      color: "#162226",
    },
    subcontainer_form: {
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      height: 300,
    },
    btn: {
      width: "100%",
      marginTop: 10,
    },
  });
}
