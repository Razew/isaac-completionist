import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import ItemProvider from "./contexts/ItemContext";
import ItemsScreen from "./screens/ItemsScreen";

export default function App() {
  return (
    <PaperProvider>
      <ItemProvider>
        <StatusBar style="auto" />
        <ItemsScreen />
      </ItemProvider>
    </PaperProvider>
  );
}
