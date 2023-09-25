import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { checklist, info } from "../../../../mock/list";
import { navigate } from "../../services/navigate/navigate";

export default (props: any) => {
  function changeDirectory() {
    navigate(props, "checklist");
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.photo}>
            <Image
              style={styles.user_photo}
              source={require("../../../../assets/screens/menu/user_photo.png")}
            />
          </View>
          <View style={styles.driver_data}>
            <Text style={styles.name}>{info.name}</Text>
            <View style={styles.info}>
              <Text style={styles.strong}>cnh</Text>
              <Text style={styles.cnh}>{info.cnh}</Text>
            </View>
          </View>
        </View>
        <View style={styles.file_galery}>
          <View style={styles.mock_file}>
            <Pressable onPress={changeDirectory}>
              <Image
                style={styles.image}
                source={require("../../../../assets/screens/mock/image_mock1.png")}
              />
            </Pressable>
          </View>
          <View style={styles.mock_file}>
            <Pressable onPress={changeDirectory}>
              <Image
                style={styles.image}
                source={require("../../../../assets/screens/mock/image_mock1.png")}
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
      height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    header: {
      flex: 1,
      width,
      flexDirection: "row",
    },
    photo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    user_photo: {},
    driver_data: {
      flex: 2,
      justifyContent: "center",
    },
    name: {
      marginLeft: 20,
      fontWeight: "bold",
      fontSize: 20,
    },
    info: {
      marginTop: 30,
      flexDirection: "row",
    },
    strong: {
      fontWeight: "bold",
      marginRight: 10,
      marginLeft: 20,
      marginTop: 10,
      fontSize: 20,
    },
    cnh: {
      borderWidth: 0.4,
      padding: 2,
      fontSize: 25,
    },
    file_galery: {
      flex: 3,
      width,
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 25,
    },
    mock_file: {
      margin: 1,
    },
    image: {
      height: 150,
      width: 150,
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    header: {
      flex: 1,
      width,
      flexDirection: "row",
    },
    photo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    user_photo: {
      height: 110,
      width: 110,
    },
    driver_data: {
      flex: 2,
      justifyContent: "center",
    },
    name: {
      marginLeft: 20,
      fontWeight: "bold",
      fontSize: 16,
    },
    info: {
      marginTop: 30,
      flexDirection: "row",
    },
    strong: {
      fontWeight: "bold",
      marginRight: 10,
      marginTop: 10,
    },
    cnh: {
      borderWidth: 0.4,
      padding: 1,
      fontSize: 20,
    },
    file_galery: {
      flex: 3,
      width,
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 25,
    },
    mock_file: {
      margin: 1,
    },
  });
}
