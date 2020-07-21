import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import TrackPlayer from "react-native-track-player";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";

const ProgressBar = () => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);

  const progress = useTrackPlayerProgress();
  const { duration, position } = progress;

  return (
    <Slider
      style={{ width: "80%", height: 40, justifyContent: "center" }}
      minimumValue={0}
      maximumValue={duration}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      value={isSeeking ? seek : position}
      onValueChange={async (value) => {
        await TrackPlayer.pause();
        setIsSeeking(true);
        setSeek(value);
      }}
      onSlidingComplete={async (value) => {
        await TrackPlayer.seekTo(value);
        await TrackPlayer.play();
        setIsSeeking(false);
        setSeek(value);
      }}
    />
  );
};

export default ProgressBar;
