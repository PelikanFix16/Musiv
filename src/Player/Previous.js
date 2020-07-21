import TrackPlayer from "react-native-track-player";

const Previous = async () => {
  let position = await TrackPlayer.getPosition();
  let trackId = await TrackPlayer.getCurrentTrack();
  let trackObject = await TrackPlayer.getTrack(trackId);
  let tracks = await TrackPlayer.getQueue();

  if (position > 10 || trackObject.id == tracks[0].id) {
    TrackPlayer.seekTo(0);
  } else {
    TrackPlayer.skipToPrevious();
  }
};

export default Previous;
