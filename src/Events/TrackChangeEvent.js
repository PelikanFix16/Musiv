import GetNextSong from "../Web/getNextSong";
import CreateTrack from "../Player/CreateTrack";
import TrackPlayer from "react-native-track-player";

const TrackChangeEvent = (setCurrentTrack) => {
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
};

export default TrackChangeEvent;
