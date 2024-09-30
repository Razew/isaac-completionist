import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";
import WebView from "react-native-webview";
import Item from "../components/Item";
import fetchItems, { Item as ItemProps } from "../utils/fetchItems";

const baseUrl = "https://bindingofisaacrebirth.fandom.com";

const getItemLayout = (_: unknown, index: number) => ({
  length: 55,
  offset: 55 * index,
  index,
});

export default function ItemsScreen() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const items = await fetchItems();
      setItems(items);
      setLoading(false);
    };

    getItems();
  }, []);

  const renderItem = ({ item }: { item: ItemProps }) => (
    <Item item={item} onPress={() => handleItemPress(item)} />
  );

  const handleItemPress = (item: ItemProps) => {
    setSelectedItem(item);
  };

  const handleModalDismiss = () => {
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator animating={true} size="large" />
        <Text style={styles.loadingText}>Loading items..</Text>
      </View>
    );
  }

  // FIXME: This SafeAreaView is only applicable to iOS
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={6}
        getItemLayout={getItemLayout}
        initialNumToRender={90}
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
  modalContent: {
    flex: 1,
    backgroundColor: "#422275",
    padding: 5,
    margin: 25,
    borderRadius: 3,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
  },
});
