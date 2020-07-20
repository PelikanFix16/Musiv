import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import SearchInput from "../Components/searchInput";
import GetMusicListApi from "../Web/getMusicList";
import ParseToVideoList from "../Web/parseToVideoList";
import GetUrlApi from "../consts/GetYoutubeApiUrl";
import ItemList from "../Components/ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faPause,
  faPlay,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
const MainScreen = () => {
  const [search, setSearch] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  console.log("test");
  const searchHandle = (text) => {
    setSearch(text);
  };
  const submit = async () => {
    const j = await GetMusicListApi(GetUrlApi(search), 0);
    const videoList = await ParseToVideoList(j);
    setMusicList(videoList);
    console.log(musicList);
  };
  const selectedMusic = (url) => {
    console.log(url);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainerInput}>
        <SearchInput submit={submit} searchHandle={searchHandle} />
      </View>
      <View style={styles.playerContainer}>
        <TouchableHighlight>
          <FontAwesomeIcon
            style={styles.styleIcon}
            size={28}
            icon={faArrowLeft}
          />
        </TouchableHighlight>
        <TouchableHighlight>
          <FontAwesomeIcon style={styles.styleIcon} size={28} icon={faPause} />
        </TouchableHighlight>
        <TouchableHighlight>
          <FontAwesomeIcon
            style={styles.styleIcon}
            icon={faArrowRight}
            size={28}
          />
        </TouchableHighlight>
      </View>
      <ScrollView>
        {musicList.map((item) => {
          return (
            <ItemList
              key={item.id}
              videoTitle={item.videoTitle}
              videoImage={item.videoImage}
              onPress={() => {
                selectedMusic(item.videoUrl);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 25,
  },
  mainContainerInput: {},
  playerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  buttonTitle: {
    fontSize: 24,
  },
  styleIcon: {
    color: "white",
    margin: 10,
  },
  buttons: {
    marginBottom: 20,
  },
});

export default MainScreen;
