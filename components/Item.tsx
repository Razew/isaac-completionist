import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Tooltip } from "react-native-paper";
import { Item as ItemProps } from "../utils/fetchItems";

const Item = ({ item, onPress }: { item: ItemProps; onPress: () => void }) => (
  <Tooltip title={item.title} leaveTouchDelay={200}>
    <Pressable onPress={onPress}>
      <View>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
    </Pressable>
  </Tooltip>
);

const styles = StyleSheet.create({
  itemImage: {
    width: 55,
    height: 55,
  },
});

export default memo(
  Item,
  (prevProps, nextProps) => prevProps.item === nextProps.item
);
