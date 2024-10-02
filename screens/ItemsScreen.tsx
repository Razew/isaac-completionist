import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import WebView from "react-native-webview";
import Item from "../components/Item";
import { useItems } from "../contexts/ItemProvider";
import { Item as ItemProps } from "../utils/fetchItems";
import LoadingScreen from "./LoadingScreen";

const baseUrl = "https://bindingofisaacrebirth.fandom.com";

export default function ItemsScreen() {
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const { items, loading } = useItems();
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const itemSize = (screenWidth / 6) * 0.9;

  const renderItem = ({ item }: { item: ItemProps }) => (
    <Item item={item} onPress={() => handleItemPress(item)} size={itemSize} />
  );

  const handleItemPress = (item: ItemProps) => {
    setSelectedItem(item);
  };

  const handleModalDismiss = () => {
    setSelectedItem(null);
  };

  const getItemLayout = (_: unknown, index: number) => ({
    length: itemSize,
    offset: itemSize * index,
    index,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoadedOnce(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || !hasLoadedOnce) {
    return <LoadingScreen message="Loading items..." />;
  }

  // The safe area part of SafeAreaView is only applicable to iOS
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={6}
        getItemLayout={getItemLayout}
        initialNumToRender={30}
      />
      {!!selectedItem && (
        <Portal>
          <Modal
            visible
            onDismiss={handleModalDismiss}
            contentContainerStyle={styles.modalContent}
          >
            <WebView source={{ uri: baseUrl + selectedItem.link }} />
          </Modal>
        </Portal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    //  backgroundColor: "#282c34"
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#422275",
    padding: 5,
    margin: 25,
    borderRadius: 3,
  },
});
