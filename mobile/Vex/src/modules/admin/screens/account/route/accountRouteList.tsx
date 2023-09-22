import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { list } from "../../../../../ListOfServices/settings/admin/list";
import { ServiceList } from "../../../../../props/navigationMenu/serviceList";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <ServiceList props={props} path={item.path} name={item.name} />
          )}
          keyExtractor={(item) => item.id}
        />
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
  list: {
    flex: 1,
  },
});