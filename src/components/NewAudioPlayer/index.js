import React from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./styles.scss";

const NewAudioPlayer = ({ src }) => {
  return (
    <ReactAudioPlayer
      showLoopControl={false}
      showVolumeControl={false}
      showJumpControls={false}
      autoPlay={false}
      src={src}
      style={{
        width: "100%",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default NewAudioPlayer;
