import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AchievementData, fetchAllAchievements } from "../api/steamApi";
import AchievementCard from "../components/AchievementCard";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { TabParamList } from "../navigators/TabNavigator";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Achievements">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function AchievementsScreen({ navigation }: Props) {
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [visible, setVisible] = useState(false);
  const achievementsRef = useRef<AchievementData[]>([]);

  const renderItem = ({ item }: { item: AchievementData }) => (
    <AchievementCard achievement={item} />
  );

  const handleDismiss = () => {
    setVisible(false), navigation.goBack();
  };

  const ApiKeyAlert = () => (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Title>API Key Required</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            To access Steam achievements, please add a Steam API key in the
            settings menu.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Go back</Button>
          <Button
            onPress={() => {
              setVisible(false), navigation.navigate("Settings");
            }}
          >
            Go to Settings
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  const fetchAchievements = async () => {
    setVisible(false);
    const result = await fetchAllAchievements();
    if (result.length === 0) {
      setVisible(true);
    } else {
      setAchievements(result);
      achievementsRef.current = result;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (achievementsRef.current.length === 0) {
        fetchAchievements();
      } else {
        setAchievements(achievementsRef.current);
      }
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.listHeader}>All Achievements</Text>
        }
        data={achievements}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        initialNumToRender={20}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={ApiKeyAlert}
        style={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingBottom: 0,
  },
  listContentContainer: {
    paddingHorizontal: 5,
  },
  listHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
});
