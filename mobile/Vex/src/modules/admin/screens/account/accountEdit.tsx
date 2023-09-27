import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    SafeAreaView,
  } from "react-native";
  
  export default (props: any) => {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>editar informações</Text>
        </View>
      </SafeAreaView>
    );
  };
  
  const { width, height } = Dimensions.get("window");
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  