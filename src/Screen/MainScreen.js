import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import SearchInput from "../Components/searchInput";
import ItemList from "../Components/ItemList";
import TrackPlayer from "react-native-track-player";

import {
  faArrowLeft,
  faPause,
  faArrowRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../Components/ProgressBar";
import TouchableIcon from "../Components/TouchableIcon";
import Previous from "../Player/Previous";
import SubmitEventSearch from "../Events/SubmitEventSearch";
import SelectMusicEvent from "../Events/SelectMusicEvent";
import UseEffectHellper from "../Effects/useEffectHelper";
import TrackChangeEvent from "../Events/TrackChangeEvent";
const MainScreen = () => {
  const [search, setSearch] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [iconCurrent, setIconCurrent] = useState(faPause);
  const [currentTrack, setCurrentTrack] = useState("");
  const [loading, setLoading] = useState(0);

  const submit = async () => {
    await SubmitEventSearch(setLoading, setMusicList, search);
  };
  const selectedMusic = async (url, image, title, id) => {
    await SelectMusicEvent(url, image, title, id, setIconCurrent);
  };

  UseEffectHellper(() => TrackChangeEvent(setCurrentTrack));

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
        <SearchInput submit={submit} searchHandle={setSearch} />
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
      <View style={styles.listView}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
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
        )}
      </View>
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
  listView: {
    width: "100%",
    height: "100%",
  },
});

export default MainScreen;
