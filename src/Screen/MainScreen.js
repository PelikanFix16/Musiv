import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchInput from "../Components/searchInput";
import GetMusicListApi from "../Web/getMusicList";

const MainScreen = () => {
  const [search, setSearch] = useState("");

  const searchHandle = (text) => {
    setSearch(text);
  };
  const submit = async () => {
    console.log(search);
    const j = await GetMusicListApi(
      "https://www.googleapis.com/youtube/v3/search?q=zeamsone&maxResults=50&key=AIzaSyARcr-X-SeQdAkGkiphpDmYGmWoKfwsh9Q",
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainerInput}>
        <SearchInput submit={submit} searchHandle={searchHandle} />
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
