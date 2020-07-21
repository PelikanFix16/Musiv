import React from "react";
import MainScreen from "./src/Screen/MainScreen";
import { View, StyleSheet, Dimensions } from "react-native";
import UseEffectHellper from "./src/Effects/useEffectHelper";
import InitializePlayer from "./src/Player/InitializePlayer";
import SetPlayerOptions from "./src/Player/SetPlayerOptions";
const App = () => {
  UseEffectHellper(async () => {
    await InitializePlayer();
    SetPlayerOptions();
  });

  return (
    <View style={styles.screen}>
      <MainScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#353839",
  },
});

export default App;
