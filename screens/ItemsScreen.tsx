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
import { Modal, Portal, Tooltip } from "react-native-paper";
import WebView from "react-native-webview";
import fetchItems, { Item as ItemProps } from "../utils/fetchItems";

const baseUrl = "https://bindingofisaacrebirth.fandom.com";

const Item = memo(
  ({ item, onPress }: { item: ItemProps; onPress: () => void }) => (
    <Tooltip title={item.title} leaveTouchDelay={200}>
      <Pressable onPress={onPress}>
        <View key={item.title}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
      </Pressable>
    </Tooltip>
  ),
  (prevProps, nextProps) => prevProps.item === nextProps.item
);

const getItemLayout = (_: unknown, index: number) => ({
  length: 55,
  offset: 55 * index,
  index,
});

export default function ItemsScreen() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      setItems(items);
    };

    getItems();
  }, []);

  const handleItemPress = (item: ItemProps) => {
    setSelectedItem(item);
  };

  const handleModalDismiss = () => {
    setSelectedItem(null);
  };

  // FIXME: This SafeAreaView is only applicable to iOS
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item item={item} onPress={() => handleItemPress(item)} />
        )}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={6}
        getItemLayout={getItemLayout}
      />
      <Portal>
        <Modal
          visible={!!selectedItem}
          onDismiss={handleModalDismiss}
          contentContainerStyle={styles.modalContent}
        >
          {selectedItem && (
            <WebView source={{ uri: baseUrl + selectedItem.link }} />
          )}
        </Modal>
      </Portal>
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
  modalContent: {
    flex: 1,
    backgroundColor: "#422275",
    padding: 5,
    margin: 25,
    borderRadius: 3,
  },
});
