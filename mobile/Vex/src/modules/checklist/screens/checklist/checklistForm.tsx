import { Button, TextInput } from "@react-native-material/core";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>campos obrigatórios *</Text>
          <Text style={styles.text}>
            pelo menos 1 dos campos é obrigatório **
          </Text>
        </View>
        <View style={styles.main}>
          <Pressable onPress={() => console.warn("click")}>
            <Image
              style={styles.camera}
              source={require("../../../../assets/screens/checklist/camera.png")}
            />
          </Pressable>
          <TextInput
            variant="outlined"
            label="km inicial**"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="km final**"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="placa*"
            color="#162226"
            style={styles.input}
          />
          <TextInput
            variant="outlined"
            label="anotações*"
            color="#162226"
            multiline={true}
            numberOfLines={6}
            style={styles.input}
          />
          <Button
            style={styles.btn}
            title="enviar"
            color="#162226"
            onPress={() => console.warn("enviar")}
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
      height: height - 250,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      flex: 1,

      width: "80%",
      justifyContent: "flex-end",
    },
    main: {
      flex: 8,
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
    },
    camera: {
      marginBottom: 25,
    },
    text: {
      fontWeight: "bold",
      color: "#162226",
    },
    input: {
      marginTop: 10,
      width: "100%",
    },
    btn: {
      marginTop: 20,
      width: "100%",
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 50,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      flex: 1,
      width: "80%",
      justifyContent: "flex-end",
    },
    main: {
      flex: 8,
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
    },
    camera: {
      marginBottom: 25,
    },
    text: {
      fontWeight: "bold",
      color: "#162226",
    },
    input: {
      marginTop: 10,
      width: "100%",
    },
    btn: {
      marginTop: 20,
      width: "100%",
    },
  });
}
