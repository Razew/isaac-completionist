import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { Tooltip } from "react-native-paper";
import { ItemData } from "../utils/fetchItems";

const Item = ({
  item,
  onPress,
  size,
}: {
  item: ItemData;
  onPress: () => void;
  size: number;
}) => (
  <Tooltip title={item.title} leaveTouchDelay={200}>
    <Pressable onPress={onPress}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: size, height: size }}
        />
      </View>
    </Pressable>
  </Tooltip>
);

export default memo(
  Item,
  (prevProps, nextProps) => prevProps.item === nextProps.item
);
