import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { RootStackParamList } from "../navigators/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Video">;

// TODO: Hide buttons when video playing?
// TODO: Add delay before skip is available?
// TODO: Add 'hint' when skip is available
export default function VideoScreen({ navigation }: Props) {
  const video = useRef<Video>(null);
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(true);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const handlePlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      setIsStatusBarHidden(false);
      navigation.navigate("HomeNavigator");
    }
  };

  const handleVideoLoad = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      // await ScreenOrientation.lockAsync(
      //   ScreenOrientation.OrientationLock.LANDSCAPE
      // );
      await video.current?.setPositionAsync(4000);
    }
  };

  const handleExit = async () => {
    if (video.current) {
      await video.current.stopAsync();
    }
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    setIsStatusBarHidden(false);
    navigation.navigate("HomeNavigator");
  };

  return (
    <TouchableWithoutFeedback onPress={handleExit}>
      <View style={styles.container}>
        <StatusBar hidden={isStatusBarHidden} />
        <Video
          ref={video}
          source={{
            uri: "https://video.akamai.steamstatic.com/store_trailers/2034156/movie480.webm?t=1447363402",
          }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          style={styles.video}
          onLoad={handleVideoLoad}
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

// useEffect(() => {
//   const lockScreenOrientation = async (
//     orientation: ScreenOrientation.OrientationLock
//   ) => {
//     await ScreenOrientation.lockAsync(orientation);
//   };

//   lockScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE);
//   return () => {
//     lockScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT);
//   };
// }, []);
