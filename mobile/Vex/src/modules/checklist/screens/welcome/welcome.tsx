import { useEffect } from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { alterScreen } from "../../controllers/animationController/animation";

export default(props: any) => {

  useEffect(() => alterScreen(props),[])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.field_right}>
        <Image
          style={styles.image}
          source={require("../../../../assets/global/name_logo_and_registry.png")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#162226",
  },
  field_right:{
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  animation_image: {},
});
