import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import RootStackNavigator from "./navigators/RootStackNavigator";
import ItemProvider from "./providers/ItemProvider";
import { combinedDarkTheme, combinedLightTheme } from "./theme";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? combinedDarkTheme : combinedLightTheme;

  return (
    <PaperProvider theme={theme}>
      <ItemProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <NavigationContainer theme={theme}>
          <RootStackNavigator />
        </NavigationContainer>
      </ItemProvider>
    </PaperProvider>
  );
}
