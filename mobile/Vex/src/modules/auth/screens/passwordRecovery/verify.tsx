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
    navigate(props, "recovery-confirm");
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
          <Image
            source={require("../../../../assets/screens/auth/activity2.png")}
          />
          <Text style={styles.step}>
            2 - insira o código que você recebeu em seu email informado no passo
            anterior!
          </Text>
          <View style={styles.subcontainer_form}>
            <TextInput
              variant="standard"
              label="código de confirmação"
              color="#162226"
              style={{ margin: 16, width: "100%" }}
            />
            <Button
              style={styles.btn}
              title="verificar"
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
    // falta estilizar o tablet
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
      height: 150,
    },
    btn: {
      width: "100%",
      marginTop: 10,
    },
  });
}
