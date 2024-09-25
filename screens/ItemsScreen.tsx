import { memo, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import fetchItems, { Item as ItemProps } from "../utils/fetchItems";

// const baseUrl = "https://bindingofisaacrebirth.fandom.com/";

// TODO: Add react-native-tooltip?
const Item = memo(({ item }: { item: ItemProps }) => (
  <View key={item.title}>
    <Image source={{ uri: item.image }} style={{ width: 55, height: 55 }} />
    {/* <Text>{item.title}</Text> */}
  </View>
));

export default function ItemsScreen() {
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      setItems(items);
    };

    getItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={6}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },
});
