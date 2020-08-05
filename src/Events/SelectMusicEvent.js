import { ToastAndroid } from "react-native";
import TrackPlayer from "react-native-track-player";
import CreateTrack from "../Player/CreateTrack";
import GetNextSong from "../Web/getNextSong";
import { faPause } from "@fortawesome/free-solid-svg-icons";
const SelectMusicEvent = async (url, image, title, id, setIconCurrent) => {
  try {
    ToastAndroid.showWithGravity(
      "Start Playing Music",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
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

export default SelectMusicEvent;
