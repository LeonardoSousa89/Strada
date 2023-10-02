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
          <TextInput
            variant="outlined"
            label="cep"
            color="#162226"
            style={styles.subcontainer_first_child}
          />
          <TextInput
            variant="outlined"
            label="tipo de logradouro"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="logradouro"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="número"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="complemento"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="bairro"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="munícipio"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="país"
            color="#162226"
            style={styles.input}
          />
          <Button
            style={styles.btn}
            title="Atualizar"
            color="#162226"
            onPress={() => console.warn("atualizar")}
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
      height,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    subcontainer: {
      flex: 1,
      width: "70%",
    },
    subcontainer_first_child: {
      marginTop: 50,
    },
    input: {
      marginTop: 10,
    },
    btn: {
      marginTop: 20,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 50,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    subcontainer: {
      flex: 1,
      width: "70%",
    },
    subcontainer_first_child: {
      marginTop: 50,
    },
    input: {
      marginTop: 10,
    },
    btn: {
      marginTop: 20,
    },
  });
}
