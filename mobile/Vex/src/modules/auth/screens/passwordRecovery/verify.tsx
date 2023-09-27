import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    SafeAreaView,
  } from "react-native";
  
  import { TextInput, Button } from "@react-native-material/core";
  import { navigate } from "../../../checklist/services/navigate/navigate";

  export default (props: any) => {
  
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View>
            <Text>verificar</Text>
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
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  } else {
    styles = StyleSheet.create({
      container: {
        height,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  }
  