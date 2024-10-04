import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import Item from "../components/Item";
import { useItems } from "../providers/ItemProvider";
import { ItemData } from "../utils/fetchItems";
import LoadingScreen from "./LoadingScreen";

const baseUrl = "https://bindingofisaacrebirth.fandom.com";

export default function ItemsScreen() {
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const { items, loading } = useItems();
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const itemSize = (screenWidth / 6) * 0.9;
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: ItemData }) => (
    <Item item={item} onPress={() => handleItemPress(item)} size={itemSize} />
  );

  const handleItemPress = (item: ItemData) => {
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
    return <LoadingScreen message="Loading Items..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.listHeader}>Collectible Items</Text>
        }
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
            contentContainerStyle={[
              styles.modalContent,
              { borderColor: colors.secondaryContainer },
            ]}
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
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flex: 1,
    // padding: 5,
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 49,
    borderRadius: 3,
    borderWidth: 3,
  },
  listHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
});
