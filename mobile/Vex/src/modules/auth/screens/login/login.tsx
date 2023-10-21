import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { useState, useEffect } from "react";

import { TextInput, Button } from "@react-native-material/core";
import { signIn } from "../../controllers/security/login";
import { navigator } from "../../controllers/navigate/navigate";

export default (props: any) => {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, [cnpj, email, password]);

  function changeDirectoryFromSignup() {
    navigator(props, "signup");
  }
  function changeDirectoryFromPasswordRecovery() {
    navigator(props, "recovery-send");
  }

  function login() {
    const orgAuth = {
      cnpj,
      password,
    };

    signIn(props, "welcome-organization", orgAuth);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../../../../assets/global/circular_logo.png")}
          />
        </View>
        <View style={styles.main}>
          <TextInput
            variant="outlined"
            label="cnpj ou email"
            color="#162226"
            style={styles.input}
            value={cnpj}
            onChangeText={(e)=>setCnpj(e)}
          />
          <TextInput
            variant="outlined"
            label="senha"
            color="#162226"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(e)=>setPassword(e)}
          />

          <Button
            style={styles.btn}
            title="login"
            color="#162226"
            onPress={() => login()}
          />
        </View>
        <View style={styles.footer}>
          <Text
            style={styles.getAccount}
            onPress={() => changeDirectoryFromPasswordRecovery()}
          >
            esqueceu sua senha?
          </Text>
          <Text
            style={styles.getAccount}
            onPress={() => changeDirectoryFromSignup()}
          >
            não possui uma conta? cadastre-se
          </Text>
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
      height: height,
      backgroundColor: "#fff",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    image: {
      marginTop: 200,
    },
    input: {
      margin: 10,
      width: "100%",
    },
    btn: {
      width: "100%",
      marginTop: 20,
    },
    getAccount: {
      fontSize: 15,
      color: "#162226",
      marginTop: 10,
      fontWeight: "bold",
    },
    terms: {
      fontSize: 20,
      marginTop: 30,
      marginBottom: 5,
      color: "#162226",
    },
    header: {
      height: "25%",
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      height: "45%",
      width: "70%",
      justifyContent: "flex-end",
      alignItems: "center",
      overflow: "hidden",
    },
    footer: {
      height: "20%",
      width: "70%",
      alignItems: "center",
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height,
      backgroundColor: "#fff",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    image: {
      marginBottom: 10,
    },
    input: {
      margin: 5,
      width: "100%",
    },
    btn: {
      width: "100%",
      marginTop: 20,
    },
    getAccount: {
      fontSize: 15,
      color: "#162226",
      marginTop: 10,
      fontWeight: "bold",
    },
    terms: {
      fontSize: 20,
      marginTop: 30,
      marginBottom: 5,
      color: "#162226",
    },
    header: {
      height: "25%",
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      height: "45%",
      width: "70%",
      justifyContent: "flex-end",
      alignItems: "center",
      overflow: "hidden",
    },
    footer: {
      height: "20%",
      width: "70%",
      alignItems: "center",
    },
  });
}
