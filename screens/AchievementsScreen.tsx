import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
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

  const renderItem = ({ achievement }: { achievement: AchievementData }) => (
    <AchievementCard achievement={achievement} />
  );

  useEffect(() => {
    async function fetcher() {
      const result = await fetchAllAchievements();
      setAchievements(result);
    }
    fetcher();
  }, []);

  if (achievements.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Surface style={styles.messageContainer} elevation={4}>
          <Text style={styles.title}>No Valid API Key Found</Text>
          <Text style={styles.message}>
            To access the achievements functionality, please add a Steam API key
            in the settings menu.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Settings")}
            buttonColor="#721c24"
          >
            Go to Settings
          </Button>
        </Surface>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Achievements Screen</Text>
      {renderItem({ achievement: achievements[0] })}
      {/* {achievements.map((a) => (
        <Text key={a.name}>{a.displayName}</Text>
      ))} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
});
