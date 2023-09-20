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

export default (props: any) => {
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
          />
          <TextInput
            variant="outlined"
            label="celular"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="nome"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="sobrenome"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="email"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="cep"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="estado"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="cidade"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="senha"
            color="#162226"
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="confirmar senha"
            color="#162226"
            secureTextEntry
            style={styles.input}
          />
          <Button
            style={styles.update}
            title="Atualizar"
            color="#162226"
            onPress={() => console.warn("atualizar")}
          />
          <Button
            style={styles.delete}
            title="deletar"
            color="#FB9F9A"
            tintColor="#fff"
            onPress={() => console.warn("deletar")}
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
      height: height + 200,
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
      marginTop: 10,
    },
    update: {
      marginTop: 20,
    },
    delete: {
      marginTop: 10,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 450,
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
    update: {
      marginTop: 20,
    },
    delete: {
      marginTop: 10,
    },
  });
}
