import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
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
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }: { item: AchievementData }) => (
    <AchievementCard achievement={item} />
  );

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
    setLoading(true);
    const result = await fetchAllAchievements();
    setAchievements(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (achievements.length === 0) {
        fetchAchievements();
      }
    }, [])
  );

  //FIXME: Dealing with loading WIP
  // if (loading) {
  //   return null;
  // }

  if (!loading && achievements.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ApiErrorMessage />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.listHeader}>All Achievements</Text>
        }
        data={achievements}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        // getItemLayout={getItemLayout}
        initialNumToRender={20}
        contentContainerStyle={styles.listContentContainer}
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
    // marginTop: 10,
    marginBottom: 5,
  },
});
