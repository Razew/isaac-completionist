import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";
import VideoScreen from "../screens/VideoScreen";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  Video: undefined;
  HomeNavigator: undefined;
  Settings: undefined;
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
      <RootStack.Screen
        name="HomeNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerBackTitle: "Back" }} // Only relevant for iOS
      />
    </RootStack.Navigator>
  );
}
