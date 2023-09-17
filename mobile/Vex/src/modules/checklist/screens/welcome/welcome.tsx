import { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { alterScreen } from "../../controllers/animationController/animation";

export default(props: any) => {

  useEffect(() => alterScreen(props),[])
  
  return (
    <View style={styles.container}>
      <View style={styles.field_right}>
        <Image
          style={styles.image}
          source={require("../../../../assets/global/name_logo_and_registry.png")}
        />
      </View>

      <View style={styles.field_down}>
        <Image
          style={styles.animation_image}
          source={require("../../../../assets/screens/animation/animation_logo.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  field_right:{
    flex: 3,
    // backgroundColor: '#000', //para testes de layout
    width: '100%',
    alignItems: "center",
    justifyContent: "flex-end",
  },
  field_down:{
    flex: 2,
    // backgroundColor: '#038C7F',  //para testes de layout
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {},
  animation_image: {},
});
