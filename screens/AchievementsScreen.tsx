import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
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
  const [achievements, setAchievements] = useState<AchievementData[]>([]); // Hade eventuellt kunnat ta bort denna och enbart använda useRef
  const [hasError, setHasError] = useState(false);
  const achievementsRef = useRef<AchievementData[]>([]);

  const renderItem = ({ item }: { item: AchievementData }) => (
    <AchievementCard achievement={item} />
  );

  // Hade nog kunnat byta ut detta mot en 'Dialog' från Paper
  const ApiErrorMessage = () => (
    <Surface style={styles.messageContainer} elevation={4}>
      <Text style={styles.title}>No Valid API Key Found</Text>
      <Text style={styles.message}>
        To access the achievements functionality, please add a Steam API key in
        the settings menu.
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Settings")}
        buttonColor="#721c24"
      >
        Go to Settings
      </Button>
    </Surface>
  );

  const fetchAchievements = async () => {
    setHasError(false);
    const result = await fetchAllAchievements();
    if (result.length === 0) {
      setHasError(true);
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
      {hasError || achievements.length === 0 ? (
        <ApiErrorMessage />
      ) : (
        <FlatList
          ListHeaderComponent={
            <Text style={styles.listHeader}>All Achievements</Text>
          }
          data={achievements}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          initialNumToRender={20}
          contentContainerStyle={styles.listContentContainer}
          style={{ width: "100%" }}
        />
      )}
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
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8d7da",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#721c24",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#721c24",
    textAlign: "center",
    marginBottom: 20,
  },
  listHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
});
