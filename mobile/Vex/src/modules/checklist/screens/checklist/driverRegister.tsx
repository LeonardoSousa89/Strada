import { Button, TextInput } from "@react-native-material/core";
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { getZipCode, insertDriver } from "../../controllers/rest/rest";

export default (props: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cnh, setCnh] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    address();
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    zipCode,
    state,
    city,
    cnh,
    telephone,
  ]);

  async function address() {
    const response = await getZipCode(zipCode);
    setState(response.uf);
    setCity(response.localidade);
  }

  async function save() {
    const data = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      zipCode,
      state,
      city,
      cnh,
      telephone,
    };

    const response = await insertDriver(data)
    
    if(response === "motorista cadastrado com sucesso") cleanFields()

    alert(response)
  }

  function cleanFields(){
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setZipCode("")
    setState("")
    setCity("")
    setCnh("")
    setTelephone("")
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.driver_photo}>
            <Pressable onPress={() => console.warn("user photo pressed")}>
              <Image
                source={require("../../../../assets/screens/menu/user_photo.png")}
              />
            </Pressable>
          </View>

          <TextInput
            variant="outlined"
            label="cnh"
            color="#162226"
            style={styles.input}
            value={cnh}
            onChangeText={(e: any) => setCnh(e)}
          />
          <TextInput
            variant="outlined"
            label="celular"
            color="#162226"
            style={styles.input}
            value={telephone}
            onChangeText={(e: any) => setTelephone(e)}
          />
          <TextInput
            variant="outlined"
            label="nome"
            color="#162226"
            style={styles.input}
            value={firstName}
            onChangeText={(e: any) => setFirstName(e)}
          />
          <TextInput
            variant="outlined"
            label="sobrenome"
            color="#162226"
            style={styles.input}
            value={lastName}
            onChangeText={(e: any) => setLastName(e)}
          />
          <TextInput
            variant="outlined"
            label="email"
            color="#162226"
            style={styles.input}
            value={email}
            onChangeText={(e: any) => setEmail(e)}
          />
          <TextInput
            variant="outlined"
            label="cep"
            color="#162226"
            style={styles.input}
            value={zipCode}
            onChangeText={(e: any) => setZipCode(e)}
          />
          <TextInput
            variant="outlined"
            label="estado"
            color="#162226"
            style={styles.input}
            value={state}
            onChangeText={(e: any) => setState(e)}
          />
          <TextInput
            variant="outlined"
            label="cidade"
            color="#162226"
            style={styles.input}
            value={city}
            onChangeText={(e: any) => setCity(e)}
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
            onPress={save}
          />
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
      height: height + 100,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    subcontainer: {
      height,
      width: "70%",
    },
    driver_photo: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    input: {
      margin: 5,
    },
    btn: {
      marginTop: 20,
      marginBottom: 100,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 400,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    subcontainer: {
      marginTop: -300,
      height,
      width: "70%",
    },
    driver_photo: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    input: {
      marginTop: 10,
    },
    btn: {
      marginTop: 20,
      marginBottom: 100,
    },
  });
}
