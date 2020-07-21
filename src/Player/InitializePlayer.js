import TrackPlayer from "react-native-track-player";

const InitializePlayer = async () => {
  await TrackPlayer.setupPlayer().then(() => {
    console.log("Track player working");
  });
};

export default InitializePlayer;
