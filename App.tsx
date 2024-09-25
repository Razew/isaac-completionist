import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Item, fetchItems } from "./fetchItems";

// const baseUrl = "https://bindingofisaacrebirth.fandom.com/";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      setItems(items);
      // console.log("Fetched items in App:", items);
    };

    getItems();
  }, []);

  return (
    <View style={styles.container}>
      {items.slice(0, 10).map((item) => (
        <View key={item.title}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 48, height: 48 }}
          />
          <Text>{item.title}</Text>
          {/* <Text>{baseUrl + item.link}</Text> */}
        </View>
      ))}
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
