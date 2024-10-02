import { getItemAsync } from "expo-secure-store";
// import { API_KEY } from "./API_KEY";

export type AchievementData = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
};

export const fetchAllAchievements = async (): Promise<AchievementData[]> => {
  const apiKey = await getItemAsync("API_KEY");
  if (!apiKey) {
    throw new Error("API key not found");
  }
  const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=250900`;
  const response = await fetch(url);
  const data = await response.json();
  return data.game.availableGameStats.achievements;
};

//   "name": "1",
//   "defaultvalue": 0,
//   "displayName": "Magdalene",
//   "hidden": 0,
//   "description": "Unlocked a new character.",
//   "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/a36d7e92df7e991758907a75dfa55d36b52548c4.jpg",
//   "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg"
