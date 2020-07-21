import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SearchInput from "../Components/searchInput";
import GetMusicListApi from "../Web/getMusicList";
import ParseToVideoList from "../Web/parseToVideoList";
import GetUrlApi from "../consts/GetYoutubeApiUrl";
import ItemList from "../Components/ItemList";
import TrackPlayer from "react-native-track-player";

import {
  faArrowLeft,
  faPause,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../Components/ProgressBar";
import GetNextSong from "../Web/getNextSong";
import TouchableIcon from "../Components/TouchableIcon";
import CreateTrack from "../Player/CreateTrack";
const MainScreen = () => {
  const [search, setSearch] = useState("");
  const [musicList, setMusicList] = useState([]);

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
  const selectedMusic = async (url, image, title, id) => {
    try {
      await TrackPlayer.add([]);
      await TrackPlayer.reset();
      const track = await CreateTrack(id, url, title, image);
      const nextSong = await GetNextSong(id);
      const track2 = await CreateTrack(
        nextSong.id,
        nextSong.videoUrl,
        nextSong.videoTitle,
        nextSong.videoImage,
      );
      await TrackPlayer.add([track, track2]);
      await TrackPlayer.play();
      let tracks = await TrackPlayer.getQueue();
      console.log(tracks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainerInput}>
        <SearchInput submit={submit} searchHandle={searchHandle} />
      </View>
      <View style={styles.playerContainer}>
        <TouchableIcon icon={faArrowLeft} />
        <TouchableIcon icon={faPause} />
        <TouchableIcon icon={faArrowRight} />
      </View>
      <View style={styles.progressBarView}>
        <ProgressBar />
      </View>
      <ScrollView>
        {musicList.map((item) => {
          return (
            <ItemList
              key={item.id}
              videoTitle={item.videoTitle}
              videoImage={item.videoImage}
              onPress={() => {
                selectedMusic(
                  item.videoUrl,
                  item.videoImage,
                  item.videoTitle,
                  item.id,
                );
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
  buttons: {
    marginBottom: 20,
  },
  progressBarView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
