import { Image } from "expo-image";
import { memo, useEffect, useState } from "react";
import {
  FlatList,
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
      <Tooltip title={item.title} leaveTouchDelay={200}>
        <View key={item.title}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
      </Tooltip>
    </Pressable>
  ),
  (prevProps, nextProps) => prevProps.item === nextProps.item // Optimization attempt
);

const getItemLayout = (_: unknown, index: number) => ({
  length: 55,
  offset: 55 * index,
  index,
});

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
        getItemLayout={getItemLayout}
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
