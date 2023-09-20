import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { checklist } from "../../../../mock/list";
import { ServiceList } from "../../props/serviceList";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={checklist}
          renderItem={({ item }) => (
            <ServiceList props={props} path={item.path} name={item.name} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
  },
});
