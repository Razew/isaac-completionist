import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoScreen from "../screens/VideoScreen";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  Video: undefined;
  HomeNavigator: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Video">
      <RootStack.Screen
        name="Video"
        component={VideoScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="HomeNavigator" component={TabNavigator} />
    </RootStack.Navigator>
  );
}
