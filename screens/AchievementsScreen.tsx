import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AchievementData, fetchAllAchievements } from "../api/steamApi";

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState<AchievementData[]>([]);

  useEffect(() => {
    async function fetcher() {
      const result = await fetchAllAchievements();
      setAchievements(result);
    }
    fetcher();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Achievements Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
