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
import fetchItems, { Item as ItemProps } from "../utils/fetchItems";

// const baseUrl = "https://bindingofisaacrebirth.fandom.com/";

// TODO: Add react-native-paper for tooltip?
const Item = memo(
  ({
    item,
    onPress,
    onLongPress,
  }: {
    item: ItemProps;
    onPress: () => void;
    onLongPress: () => void;
  }) => (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <View key={item.title}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
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

  const handleItemLongPress = (item: ItemProps) => {
    alert(item.title);
  };

  // FIXME: This SafeAreaView is only applicable to iOS
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => null}
            onLongPress={() => handleItemLongPress(item)}
          />
        )}
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
