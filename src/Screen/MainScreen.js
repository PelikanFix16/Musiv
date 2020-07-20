import React from "react";
import { View, StyleSheet } from "react-native";
import SearchInput from "../Components/searchInput";

const MainScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainerInput}>
        <SearchInput />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
  },
  mainContainerInput: {
    width: "80%",
  },
});

export default MainScreen;
