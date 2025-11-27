/* eslint-disable no-extra-semi */
import React, { useEffect, useRef, useState, useContext } from "react"; // ⬅️ add useContext
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import BACKGROUND_COLORS from "../../Constants/BackGroundColors";
import formatTime from "../../Helper/formatTime";
import { GlobalContext } from '../GlobalContext'; // ⬅️ import context

const AudioPlayer = ({
  id,
  playingId,
  setPlayingId,
  title = "Unknown Title...",
  artist = "",
  source, 
  onEnd,
  handleViewPost,
  item,
}) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [pausedTime, setPausedTime] = useState(0);

  const { setIsMediaPlaying } = useContext(GlobalContext); // ⬅️ ADD CONTEXT

  const isPlaying = playingId === id;

  // 🧠 Detect if it's a video link (ignore video)
  const isVideoUrl =
    typeof source === "string" &&
    (source.includes("youtube.com") ||
      source.includes("youtu.be") ||
      source.endsWith(".mp4") ||
      source.endsWith(".mkv") ||
      source.endsWith(".mov") ||
      source.endsWith(".avi"));

  const videoProps = isVideoUrl
    ? { ignoreVideo: true }
    : { audioOnly: true };

  // 🧩 FIX: Resume from paused time, not reset
  useEffect(() => {
    if (isPlaying && audioRef.current && pausedTime > 0) {
      audioRef.current.seek(pausedTime);
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setPausedTime(currentTime);
      setPlayingId(null);
      setIsMediaPlaying(false); // ⬅️ UPDATE CONTEXT
    } else {
      handleViewPost(item);
      setPlayingId(id);
      setIsMediaPlaying(true); // ⬅️ UPDATE CONTEXT
    }
  };

  const toggleSpeed = () => {
    if (playbackRate === 1) setPlaybackRate(1.5);
    else if (playbackRate === 1.5) setPlaybackRate(2);
    else setPlaybackRate(1);
  };

  const onSeekStart = () => setIsSeeking(true);
  const onSeekComplete = (value) => {
    setIsSeeking(false);
    setCurrentTime(value);
    setPausedTime(value);
    audioRef.current.seek(value);
  };
  const onSliding = (value) => setSeekTime(value);

  return (
    <View style={styles.container}>
      {/* Hidden Audio Player */}
      <Video
        ref={audioRef}
        source={typeof source === "string" ? { uri: source } : source}
        paused={!isPlaying}
        rate={playbackRate}
        onLoad={(data) => setDuration(data.duration)}
        onProgress={(data) => {
          if (!isSeeking) setCurrentTime(data.currentTime);
        }}
        onEnd={() => {
          if (onEnd) onEnd(id);
          setPlayingId(null);
          setCurrentTime(0);
          setPausedTime(0);
          setIsMediaPlaying(false); // ⬅️ CONTEXT OFF
        }}
        onError={(e) => console.log("Audio Error:", e)}
        {...videoProps}
      />

      {/* Info Section */}
      <View style={styles.infoRow}>
        <TouchableOpacity onPress={togglePlayPause}>
          <Icon
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={55}
            color="#2196F3"
          />
        </TouchableOpacity>

        <View style={styles.textSection}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {artist ? <Text style={styles.artist}>{artist}</Text> : null}
        </View>

        <TouchableOpacity onPress={toggleSpeed} style={styles.speedButton}>
          <Text style={styles.speedText}>{playbackRate}x</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.time}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={isSeeking ? seekTime : currentTime}
          minimumTrackTintColor="#2196F3"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#2196F3"
          onSlidingStart={onSeekStart}
          onValueChange={onSliding}
          onSlidingComplete={onSeekComplete}
        />
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLORS.white,
    borderRadius: 10,
    padding: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  artist: {
    fontSize: 15,
    color: "#666",
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  time: {
    fontSize: 13,
    color: "#555",
    width: 45,
    textAlign: "center",
  },
  speedButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  speedText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AudioPlayer;
