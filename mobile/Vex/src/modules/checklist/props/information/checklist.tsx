import {
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";

export const CheckList = (props: {
  recordedBy: string;
  cnh: string;
  initialKm: string;
  plate: string;
  dateFromRecord: string;
  notes: string;
}) => {
  return (
    <View style={styles.record}>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>registrado por: </Text>
        <Text style={styles.text}>{props.recordedBy}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>cnh: </Text>
        <Text style={styles.text}>{props.cnh}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>km inicial: </Text>
        <Text style={styles.text}>{props.initialKm}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>placa: </Text>
        <Text style={styles.text}>{props.plate}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>data de registro: </Text>
        <Text style={styles.text}>{props.dateFromRecord}</Text>
      </View>
      <View style={styles.subContainerNote}>
        <View style={styles.subContainerHeader}>
          <Text style={styles.strong}>anotações: </Text>
        </View>
        <View style={styles.subContainerInfo}>
          <Text style={styles.text}>{props.notes}</Text>
        </View>
      </View>
    </View>
  );
};

export const Midia = (props: { typeOfFile: string; size: string }) => {
  return (
    <View style={styles.file}>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>tipo de arquivo: </Text>
        <Text style={styles.text}>{props.typeOfFile}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.strong}>size: </Text>
        <Text style={styles.text}>{props.size}</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

let styles: any = 0;

if (height > 720) {
  styles = StyleSheet.create({
    record: {
      backgroundColor: "#fff",
      padding: 20,
      width,
      borderWidth: 0.4,
      marginTop: 2,
      borderColor: "#162226",
      justifyContent: "center",
      alignItems: "center",
    },
    file: {
      backgroundColor: "#fff",
      padding: 40,
      width,
      borderWidth: 0.4,
      borderColor: "#162226",
      justifyContent: "center",
      alignItems: "center",
    },
    subContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      width: "90%",
    },
    subContainerNote: {
      flexDirection: "row",
      marginTop: 10,
    },
    subContainerHeader: {
      width: "30%",
    },
    subContainerInfo: {
      width: "70%",
    },
    strong: {
      fontWeight: "bold",
      color: "#162226",
      fontSize: 20,
      textAlign: "center",
    },
    text: {
      color: "#162226",
      fontSize: 20,
    },
  });
} else {
  styles = StyleSheet.create({
    record: {
      backgroundColor: "#fff",
      padding: 20,
      width,
      borderWidth: 0.4,
      marginTop: 2,
      borderColor: "#162226",
      justifyContent: "center",
      alignItems: "center",
    },
    file: {
      backgroundColor: "#fff",
      padding: 40,
      width,
      borderWidth: 0.4,
      borderColor: "#162226",
      justifyContent: "center",
      alignItems: "center",
    },
    subContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      width: "94%",
    },
    subContainerNote: {
      flexDirection: "row",
      marginTop: 10,
      width,
    },
    subContainerHeader: {
      width: "40%",
    },
    subContainerInfo: {
      width: "60%",
    },
    strong: {
      fontWeight: "bold",
      color: "#162226",
      fontSize: 16,
      textAlign: "center",
    },
    text: {
      color: "#162226",
      fontSize: 16,
    },
  });
}
