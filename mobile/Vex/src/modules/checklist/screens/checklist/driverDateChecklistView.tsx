import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { dateFromChecklist } from "../../../../mock/list";
import { ServiceList } from "../../../../props/navigationMenu/serviceList";

export default (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={dateFromChecklist}
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
