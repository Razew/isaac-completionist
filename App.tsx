import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import ItemProvider from "./contexts/ItemProvider";
import RootStackNavigator from "./navigators/RootStackNavigator";

export default function App() {
  return (
    <PaperProvider>
      <ItemProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootStackNavigator />
        </NavigationContainer>
      </ItemProvider>
    </PaperProvider>
  );
}
