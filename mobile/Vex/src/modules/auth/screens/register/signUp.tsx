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
import { navigate } from "../../services/navigate/navigate";
import { register } from "../../controllers/security/signUp";

import Dialog from "react-native-dialog";
import { useEffect, useState } from "react";
import TermsAndPolicies from "../../../doc/screens/termsAndPolicies";
import Msg from "../../../../interface/response/class/message";

export default (props: any) => {
  const [visible, setVisible] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  useEffect(()=>{},[])
  useEffect(() => {}, [cnpj, password, confirmPassword]);

  function changeDirectory() {
    navigate(props, "login");
  }

  function signUp() {
    register(cnpj, password, props, "login");
  }

  const terms = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const accept = () => {
    if(password === confirmPassword){

      setVisible(false);
      signUp();
    }else{
      setVisible(false);
      alert(new Msg().message("as senhas não conferem"))
    }
  };

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
            label="cnpj"
            color="#162226"
            style={styles.input}
            value={cnpj}
            onChangeText={(e: any) => setCnpj(e)}
          />
          <TextInput
            variant="outlined"
            label="senha"
            color="#162226"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(e: any) => setPassword(e)}
          />
          <TextInput
            variant="outlined"
            label="confirmar senha"
            color="#162226"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={(e: any) => setConfirmPassword(e)}
          />
          <Button
            style={styles.btn}
            title="Cadastro"
            color="#162226"
            onPress={terms}
          />
          <Dialog.Container visible={visible}>
            <Dialog.Title>Termos de uso e política de privacidade</Dialog.Title>
            <ScrollView>
              <Dialog.Description>
                <TermsAndPolicies />
              </Dialog.Description>
            </ScrollView>
            <Dialog.Button
              style={{ fontWeight: "bold" }}
              label="Cancelar"
              color="#162226"
              onPress={close}
            />
            <Dialog.Button
              style={{ fontWeight: "bold" }}
              label="Aceitar"
              color="#162226"
              onPress={accept}
            />
          </Dialog.Container>
        </View>
        <View style={styles.footer}>
          <Text style={styles.getAccount} onPress={() => changeDirectory()}>
            já possui uma conta? faça login
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
      height,
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
      height,
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
