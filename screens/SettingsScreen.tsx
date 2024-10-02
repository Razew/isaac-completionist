import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const saveApiKey = async (value: string): Promise<void> => {
  await setItemAsync("API_KEY", value);
};

export default function SettingsScreen() {
  const [inputApiKey, setInputApiKey] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSave = () => {
    saveApiKey(inputApiKey);
    setInputApiKey("");
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Configure Steam API Key</Text>
        <Text style={styles.subtitle}>(required for achievements)</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="API Key"
          value={inputApiKey}
          onChangeText={(inputApiKey) => setInputApiKey(inputApiKey)}
          style={styles.input}
        />
        <Button mode="text" onPress={handleSave} style={styles.button}>
          Save
        </Button>
      </View>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={() => {
          setVisible(false);
        }}
      >
        API Key saved
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -12,
    paddingHorizontal: 25,
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: "italic",
    marginStart: 1,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingRight: 80,
  },
  button: {
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
  },
});
