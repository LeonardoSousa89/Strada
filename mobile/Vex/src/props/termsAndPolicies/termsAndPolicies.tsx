import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
} from "@react-native-material/core";

import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

export default (props: {
  props: any;
  visible: any;
  setVisible: any;
  text: any;
  title: any;
}) => {

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          {/* <Dialog
            visible={props.visible}
            onDismiss={() => props.setVisible(false)}
          >
            <DialogHeader title={props.title}>
              <Text>{props.text}</Text>
            </DialogHeader>
          </Dialog>
          <Button
            title="Cancel"
            compact
            variant="text"
            onPress={() => close()}
          />
          <Button 
            title="Ok" 
            compact 
            variant="text" 
            onPress={() => close()} 
            /> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
