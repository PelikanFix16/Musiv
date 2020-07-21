import TrackPlayer from "react-native-track-player";
import Previous from "../Player/Previous";

module.exports = async function () {


  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());

  TrackPlayer.addEventListener("remote-next",()=>TrackPlayer.skipToNext());

  TrackPlayer.addEventListener("remote-previous", async ()=> await Previous());



};
 