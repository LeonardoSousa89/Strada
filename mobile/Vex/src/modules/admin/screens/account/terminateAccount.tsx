import { Button, TextInput } from "@react-native-material/core";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { navigator } from "../../controllers/navigate/navigate";
import { CheckBox } from "react-native-elements";
import { useState } from "react";

import Dialog from "react-native-dialog";
import { Ionicons } from "@expo/vector-icons";

export default (props: any) => {
  const [visible, setVisible] = useState(false);
  const [checkPlanHigherCoast, setCheckPlanHigherCoast]: any = useState(false);
  const [checkLessResources, setCheckLessResources]: any = useState(false);
  const [checkMigratePlatform, setCheckMigratePlatform]: any = useState(false);
  const [checkUsedServiceWithNeed, setCheckUsedServiceWithNeed]: any =
    useState(false);
  const [checkOthers, setCheckOthers]: any = useState(false);

  function setStateCheckPlanHigherCoast() {
    setCheckPlanHigherCoast(true);
    setCheckLessResources(false);
    setCheckMigratePlatform(false);
    setCheckUsedServiceWithNeed(false);
    setCheckOthers(false);
  }
  function setStatecheckLessResources() {
    setCheckPlanHigherCoast(false);
    setCheckLessResources(true);
    setCheckMigratePlatform(false);
    setCheckUsedServiceWithNeed(false);
    setCheckOthers(false);
  }
  function setStatecheckMigratePlatform() {
    setCheckPlanHigherCoast(false);
    setCheckLessResources(false);
    setCheckMigratePlatform(true);
    setCheckUsedServiceWithNeed(false);
    setCheckOthers(false);
  }
  function setStateCheckUsedServiceWithNeed() {
    setCheckMigratePlatform(false);
    setCheckPlanHigherCoast(false);
    setCheckLessResources(false);
    setCheckUsedServiceWithNeed(true);
    setCheckOthers(false);
  }
  function setStateCheckOthers() {
    setCheckUsedServiceWithNeed(false);
    setCheckMigratePlatform(false);
    setCheckPlanHigherCoast(false);
    setCheckLessResources(false);
    setCheckOthers(true);
  }

  const dialog = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const accept = () => {
    setVisible(false);
    terminateAccount();
  };

  function terminateAccount() {
    navigator(props, "terminate-account-activity-page");
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.message}>
            <Text style={styles.text_message}>Por favor,</Text>
            <Text style={styles.text_message}>
              Ajude-nos a entender sua decisão
            </Text>
            <Text style={styles.text_message}>
              e melhorar a experiência para outros!
            </Text>
          </View>

          <View style={styles.checkbox}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#9BAEBF"
              checked={checkPlanHigherCoast}
              onPress={setStateCheckPlanHigherCoast}
            />
            <Text style={styles.checkbox_message}>Plano muito caro</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#9BAEBF"
              checked={checkLessResources}
              onPress={setStatecheckLessResources}
            />
            <Text style={styles.checkbox_message}>Possui poucos recursos</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#9BAEBF"
              checked={checkMigratePlatform}
              onPress={setStatecheckMigratePlatform}
            />
            <Text style={styles.checkbox_message}>
              Estou mudando de plataforma
            </Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#9BAEBF"
              checked={checkUsedServiceWithNeed}
              onPress={setStateCheckUsedServiceWithNeed}
            />
            <Text style={styles.checkbox_message}>
              Já usei o serviço que precisava
            </Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#9BAEBF"
              checked={checkOthers}
              onPress={setStateCheckOthers}
            />
            <Text style={styles.checkbox_message}>outros</Text>
          </View>
          {checkOthers === true ? (
            <>
              <TextInput
                variant="standard"
                label="sua resposta"
                color="#162226"
                style={{ margin: 16, width: "88%" }}
              />
            </>
          ) : (
            <></>
          )}
          <Button
            style={styles.btn}
            title="encerrar conta"
            color="#FB9F9A"
            tintColor="#fff"
            onPress={dialog}
          />
          <Dialog.Container visible={visible}>
            <Dialog.Description>
              <View style={styles.dialog_container}>
                <Ionicons
                  name="md-trash-sharp"
                  size={28}
                  color="#162226"
                  style={{ margin: 10 }}
                />
                <Text style={{ fontWeight: "bold", color: "#162226" }}>
                  Deseja excluir a conta permanentemente?
                </Text>
              </View>
            </Dialog.Description>
            <Dialog.Button
              style={{ fontWeight: "bold" }}
              label="Cancelar"
              color="#162226"
              onPress={close}
            />
            <Dialog.Button
              style={{ fontWeight: "bold" }}
              label="Aceitar"
              color="#162226"
              onPress={accept}
            />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  subcontainer: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    borderWidth: 0.4,
    backgroundColor: "#2B3640",
    width: "100%",
    padding: 20,
    margin: 16,
  },
  text_message: {
    fontWeight: "bold",
    color: "#fff",
  },
  checkbox_message: {
    color: "#2B3640",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    marginTop: 20,
    width: "88%",
  },
  dialog_container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
