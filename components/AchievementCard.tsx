import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { AchievementData } from "../api/steamApi";

const AchievementCard = ({ achievement }: { achievement: AchievementData }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={achievement.displayName}
        subtitle={achievement.description}
        left={() => (
          <Image source={{ uri: achievement.icon }} style={styles.image} />
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: -3,
  },
});

export default memo(
  AchievementCard,
  (prevProps, nextProps) => prevProps.achievement === nextProps.achievement
);
