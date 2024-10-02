import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const checkApiKeyExists = async () => {
  const result = await getItemAsync("API_KEY");
  return result !== null;
};

const saveApiKey = async (value: string) => {
  await setItemAsync("API_KEY", value);
};

const deleteApiKey = async () => {
  await deleteItemAsync("API_KEY");
};

export default function SettingsScreen() {
  const [inputApiKey, setInputApiKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [apiKeyExists, setApiKeyExists] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      const exists = await checkApiKeyExists();
      setApiKeyExists(exists);
    };

    checkApiKey();
  }, []);

  const handleSave = async () => {
    await saveApiKey(inputApiKey);
    setInputApiKey("");
    setVisible(true);
    setApiKeyExists(true);
  };

  const handleReset = async () => {
    await deleteApiKey();
    setApiKeyExists(false);
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
        <Button mode="text" onPress={handleSave} style={styles.saveButton}>
          Save
        </Button>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>API Key Status: </Text>
        <Text
          style={[
            styles.status,
            {
              color: apiKeyExists ? "#388E3C" : "#F44336",
              fontWeight: "bold",
            },
          ]}
        >
          {apiKeyExists ? "SAVED" : "MISSING"}
        </Text>
      </View>
      <Button mode="contained" style={styles.resetButton} onPress={handleReset}>
        Reset key
      </Button>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={() => {
          setVisible(false);
        }}
        style={styles.snackbar}
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
    marginLeft: 1,
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
  saveButton: {
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
  },
  resetButton: {
    width: "60%",
    alignSelf: "center",
  },
  statusContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  status: {
    fontSize: 18,
  },
  snackbar: {
    width: "100%",
    marginHorizontal: 25,
    marginBottom: 25,
  },
});
