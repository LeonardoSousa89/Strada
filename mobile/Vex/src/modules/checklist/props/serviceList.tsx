import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { navigation } from "../entities/ListOfServices/list";

export const ServiceList = (props: { 
        props?: any,
        path?: string,
        name?: string,
        imageUri?: string, 
    }) => {
  function navigate() {
    navigation(props.props, props.path);
  }

  return (
    <Pressable onPress={navigate}>
      <View style={styles.item}>
        <Text style={styles.text}>{props.name}</Text>
        {/* esse recurso está gerando um erro */}
        {/* <Image source={require(props.imageUri)}/> */} 
      </View>
    </Pressable>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 40,
    width,
    borderWidth:0.4,
    marginTop: 5,
    borderColor: '#162226',
    justifyContent: "center",
    alignItems: "center",
  },text: {
    fontWeight: "bold",
    color: '#162226',
    fontSize: 20,
    textDecorationLine: "underline",
  }
});
