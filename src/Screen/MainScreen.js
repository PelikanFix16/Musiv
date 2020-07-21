import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import SearchInput from "../Components/searchInput";
import GetMusicListApi from "../Web/getMusicList";
import ParseToVideoList from "../Web/parseToVideoList";
import GetUrlApi from "../consts/GetYoutubeApiUrl";
import ItemList from "../Components/ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TrackPlayer from "react-native-track-player";
import ytdl from "react-native-ytdl";

import {
  faArrowLeft,
  faPause,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
const MainScreen = () => {
  const [search, setSearch] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [trackList, setTrackList] = useState([]);
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
    const youtubeURL = url;
    const urls = await ytdl(youtubeURL, { quality: "highestaudio" });
    let state = await TrackPlayer.getState();
    if (state == 3) {
      await TrackPlayer.add([]);
      await TrackPlayer.reset();
    }
    let track = {
      id,
      url: urls[0].url,
      title,
      artwork: image,
    };
    setTrackList([track]);
    await TrackPlayer.add([track]);
    await TrackPlayer.play();
  };

  useEffect(() => {
    const initi = async () => {
      try {
        await TrackPlayer.setupPlayer().then(() => {
          console.log("Track player working");
        });
        await TrackPlayer.updateOptions({
          // One of RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE

          // Whether the player should stop running when the app is closed on Android
          stopWithApp: true,

          // An array of media controls capabilities
          // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
          // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };
    initi();
  }, []);

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
  styleIcon: {
    color: "white",
    margin: 10,
  },
  buttons: {
    marginBottom: 20,
  },
});

export default MainScreen;
