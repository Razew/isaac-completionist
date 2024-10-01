import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { RootStackParamList } from "../navigators/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Video">;

// TODO: Hide statusbar/buttons when video playing?
export default function VideoScreen({ navigation }: Props) {
  const video = useRef<Video>(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const handlePlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      if (status.positionMillis < 4000) {
        await video.current?.setPositionAsync(4000);
      }
      if (status.didJustFinish) {
        ScreenOrientation.unlockAsync();
        navigation.navigate("HomeNavigator");
      }
    }
  };

  const handleExit = async () => {
    if (video.current) {
      await video.current.stopAsync();
    }
    ScreenOrientation.unlockAsync();
    navigation.navigate("HomeNavigator");
  };

  return (
    <TouchableWithoutFeedback onPress={handleExit}>
      <View style={styles.container}>
        <Video
          ref={video}
          source={{
            uri: "https://video.akamai.steamstatic.com/store_trailers/2034156/movie480.webm?t=1447363402",
          }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          style={styles.video}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
