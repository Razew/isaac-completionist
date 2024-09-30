import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function VideoScreen() {
  const video = useRef(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{
          uri: "https://video.akamai.steamstatic.com/store_trailers/2034156/movie480.webm?t=1447363402",
        }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        style={styles.video}
        // onPlaybackStatusUpdate={}
      />
    </View>
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
