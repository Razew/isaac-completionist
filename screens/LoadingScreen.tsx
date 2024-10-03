import { StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: Props) {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      {!!message ? <Text style={styles.loadingText}>{message}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
  },
});
