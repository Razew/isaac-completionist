import { Image } from "expo-image";
import { Linking, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Isaac Completionist</Text>
      <Image
        source={{
          uri: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTVoNXVzNmxxbTd4cWRldmxtM2N1ajF4Ymhmb2trYW96c2Q1djNmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/NmilAru4aJYjlpy6cx/giphy.gif",
        }}
        style={styles.image}
      />
      <Text style={styles.subtitle}>
        The app for all of your The Binding of Isaac: Rebirth needs!
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            "https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/"
          )
        }
      >
        Store Page
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            "https://bindingofisaacrebirth.fandom.com/wiki/Binding_of_Isaac:_Rebirth_Wiki"
          )
        }
      >
        TBOI: Rebirth - Wiki
      </Button>
      <Button mode="contained" style={styles.button} disabled>
        Settings
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 32,
  },
  button: {
    marginVertical: 8,
    width: "70%",
  },
  image: {
    width: 250,
    height: 250,
  },
});
