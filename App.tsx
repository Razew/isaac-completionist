import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ItemsScreen from "./screens/ItemsScreen";

// const baseUrl = "https://bindingofisaacrebirth.fandom.com/";

export default function App() {
  return (
    <View style={styles.container}>
      <ItemsScreen />
      <StatusBar style="auto" />
    </View>
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

// {
//   items.slice(0, 10).map((item) => (
//     <View key={item.title}>
//       <Image
//         source={{ uri: item.image }}
//         style={{ width: 48, height: 48 }}
//       />
//       <Text>{item.title}</Text>
//       {/* <Text>{baseUrl + item.link}</Text> */}
//     </View>
//   ));
// }
