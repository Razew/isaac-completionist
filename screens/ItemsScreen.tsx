import { memo, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Tooltip } from "react-native-paper";
import fetchItems, { Item as ItemProps } from "../utils/fetchItems";

// const baseUrl = "https://bindingofisaacrebirth.fandom.com/";

const Item = memo(
  ({ item, onPress }: { item: ItemProps; onPress: () => void }) => (
    <Pressable onPress={onPress}>
      <Tooltip title={item.title} leaveTouchDelay={500}>
        <View key={item.title}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
      </Tooltip>
    </Pressable>
  )
);

// TODO: Add WebView for when clicking on an item and display the WebView in a modal
export default function ItemsScreen() {
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      setItems(items);
    };

    getItems();
  }, []);

  // FIXME: This SafeAreaView is only applicable to iOS
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} onPress={() => null} />}
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
  itemImage: {
    width: 55,
    height: 55,
  },
});
