import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

import { Pressable } from "@react-native-material/core";
import { checklist } from "../../../../mock/list";

export default (props: any) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.checklist}>
            <View style={styles.midia}>
              <Image
                style={styles.image}
                source={require("../../../../assets/screens/mock/midia_mock.png")}
              />
            </View>
            <View style={styles.data}>
              <View style={styles.info}>
                <Text style={styles.strong}>data de registro:</Text>
                <Text style={styles.info_data}>
                  {checklist[0].dateFromRecord}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.strong}>placa do veículo:</Text>
                <Text style={styles.info_data}>{checklist[0].plate}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.strong}>km inicial:</Text>
                <Text style={styles.info_data}>{checklist[0].initialKm}</Text>
              </View>
              <View style={styles.note}>
                <View style={styles.left}>
                  <Text style={styles.strong}>anotações:</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.info_data}>{checklist[0].notes}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.operations}>
            <Pressable onPress={() => console.warn("delete")}>
              <Image
                style={styles.btn}
                source={require("../../../../assets/screens/checklist/delete_btn.png")}
              />
            </Pressable>
            <Pressable onPress={() => console.warn("share")}>
              <Image
                style={styles.btn}
                source={require("../../../../assets/screens/checklist/share_btn.png")}
              />
            </Pressable>
          </View>

        </View>


        <View style={styles.subcontainer}>
          <View style={styles.checklist}>
            <View style={styles.midia}>
              <Image
                style={styles.image}
                source={require("../../../../assets/screens/mock/midia_mock.png")}
              />
            </View>
            <View style={styles.data}>
              <View style={styles.info}>
                <Text style={styles.strong}>data de registro:</Text>
                <Text style={styles.info_data}>
                  {checklist[0].dateFromRecord}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.strong}>placa do veículo:</Text>
                <Text style={styles.info_data}>{checklist[0].plate}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.strong}>km inicial:</Text>
                <Text style={styles.info_data}>{checklist[0].initialKm}</Text>
              </View>
              <View style={styles.note}>
                <View style={styles.left}>
                  <Text style={styles.strong}>anotações:</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.info_data}>{checklist[0].notes}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.operations}>
            <Pressable onPress={() => console.warn("delete")}>
              <Image
                style={styles.btn}
                source={require("../../../../assets/screens/checklist/delete_btn.png")}
              />
            </Pressable>
            <Pressable onPress={() => console.warn("share")}>
              <Image
                style={styles.btn}
                source={require("../../../../assets/screens/checklist/share_btn.png")}
              />
            </Pressable>
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
      height: height + 580,  // dimensões para teste de demonstração, a solução será um infinite scroll
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
    },
    subcontainer: {
      height: height -200, //as dimensõe podem ser alteradas
      margin: 2,
      backgroundColor: "#fff",
    },
    image: {
      height: 300,
      width: 500
    },
    checklist: {
      flex: 6,
      width,
    },
    midia: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    data: {
      padding: 50,
      height: 300,
    },
    info: {
      flexDirection: "row",
    },
    strong: {
      fontWeight: "bold",
    },
    info_data: {
      marginLeft: 5,
    },
    note: {
      flexDirection: "row",
      height: 150,
      marginTop: 10,
      overflow: "hidden",
    },
    left: {
      width: "30%",
    },
    right: {
      width: "70%",
      borderWidth: 0.4,
    },
    operations: {
      flex: 1,
      flexDirection: "row",
      width,
      alignItems: "center",
      justifyContent: "space-evenly",
      marginBottom: 10
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height: height + 680, // dimensões para teste de demonstração, a solução será um infinite scroll
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
    },
    subcontainer: {
      height, //as dimensõe podem ser alteradas
      margin: 2,
      backgroundColor: "#fff",
    },
    checklist: {
      flex: 6,
      width,
    },
    midia: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    data: {
      padding: 20,
      height: 300,
    },
    info: {
      flexDirection: "row",
    },
    strong: {
      fontWeight: "bold",
    },
    info_data: {
      marginLeft: 5,
    },
    note: {
      flexDirection: "row",
      height: 150,
      marginTop: 10,
      overflow: "hidden",
    },
    left: {
      width: "25%",
    },
    right: {
      width: "75%",
      borderWidth: 0.4,
    },
    operations: {
      flex: 1,
      flexDirection: "row",
      width,
      alignItems: "center",
      justifyContent: "space-evenly",
      marginBottom: 10
    },
  });
}
