import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import ItemsScreen from "./screens/ItemsScreen";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <ItemsScreen />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
