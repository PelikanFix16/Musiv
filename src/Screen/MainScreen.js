import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
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
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../Components/ProgressBar";
import GetNextSong from "../Web/getNextSong";
import TouchableIcon from "../Components/TouchableIcon";
import CreateTrack from "../Player/CreateTrack";
import Previous from "../Player/Previous";
const MainScreen = () => {
  const [search, setSearch] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [iconCurrent, setIconCurrent] = useState(faPause);
  const [currentTrack, setCurrentTrack] = useState("");
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
      setIconCurrent(faPause);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TrackPlayer.addEventListener("playback-track-changed", async (data) => {
      try {
        let tracks = await TrackPlayer.getQueue();
        let last_track = tracks[tracks.length - 1].id;
        let current_track = data.nextTrack;
        let trackObject = await TrackPlayer.getTrack(data.nextTrack);
        setCurrentTrack(trackObject.title);
        if (current_track == last_track) {
          const nextSong = await GetNextSong(last_track);
          const track = await CreateTrack(
            nextSong.id,
            nextSong.videoUrl,
            nextSong.videoTitle,
            nextSong.videoImage,
          );
          tracks.push(track);
          await TrackPlayer.add(track);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const setPause = () => {
    if (iconCurrent == faPause) {
      TrackPlayer.pause();
      setIconCurrent(faPlay);
    } else {
      TrackPlayer.play();
      setIconCurrent(faPause);
    }
  };

  useEffect(() => {
    TrackPlayer.addEventListener("remote-pause", () => {
      TrackPlayer.pause();
      setIconCurrent(faPlay);
    });
    TrackPlayer.addEventListener("remote-play", () => {
      TrackPlayer.play();
      setIconCurrent(faPause);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainerInput}>
        <SearchInput submit={submit} searchHandle={searchHandle} />
      </View>
      <View style={styles.playerContainer}>
        <TouchableIcon
          icon={faArrowLeft}
          onPress={async () => {
            await Previous();
          }}
        />
        <TouchableIcon icon={iconCurrent} onPress={setPause} />
        <TouchableIcon icon={faArrowRight} onPress={TrackPlayer.skipToNext} />
      </View>
      <View style={styles.progressBarView}>
        <ProgressBar />
      </View>
      <View style={styles.currentTrackView}>
        <Text style={styles.currentText}>{currentTrack}</Text>
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
  currentTrackView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  currentText: {
    color: "#b39ddb",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default MainScreen;
