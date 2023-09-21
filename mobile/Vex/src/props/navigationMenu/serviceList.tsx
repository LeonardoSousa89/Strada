import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";

export const ServiceList = (props: {
  props?: any;
  path?: any;
  name?: string;
  imageUri?: string;
}) => {
  function navigation() {
    props.props.navigation.navigate(props.path)
  }

  return (
    <Pressable onPress={navigation}>
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
    borderWidth: 0.4,
    marginTop: 2,
    borderColor: "#162226",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#162226",
    fontSize: 20,
    textAlign: "center",
    // textDecorationLine: "underline",
  },
});
