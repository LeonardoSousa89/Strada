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
} from "react-native";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <TextInput
          variant="outlined"
          label="senha atual"
          color="#162226"
          secureTextEntry
          style={styles.subcontainer_first_child}
        />
        <TextInput
          variant="outlined"
          label="nova senha"
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
          style={styles.btn}
          title="Atualizar"
          color="#162226"
          onPress={() => console.warn("atualizar")}
        />
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    flex: 1,
    width: "70%",
  },
  subcontainer_first_child:{
    marginTop: 50
  },
  input: {
    marginTop: 10
  },
  btn: {
    marginTop: 20,
  },
});
