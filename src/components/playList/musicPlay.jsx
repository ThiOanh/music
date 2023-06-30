import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { getDuration } from "../../helper";
import "./music.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faRepeat,
  faForward,
  faBackward,
  faPause,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

function MusicPlay(props) {
  const {
    name,
    artist,
    cover,
    src,
    isPlay,
    isLooping,
    onNextSong,
    onPreviousSong,
    onToggleLooping,
    isShuffling,
    onToggleShuffle,
  } = props;

  const audioRef = useRef();
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(isPlay);
  const [duration, setDuration] = useState(0);

  const onChangeSlider = useCallback((event) => {
    audioRef.current.currentTime = event.target.value;
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleSongEnd = () => {
      if (isLooping) {
        // Lặp lại bài hát khi kết thúc nếu nút lặp lại được chọn
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        // Chuyển sang bài hát tiếp theo nếu không lặp lại
        onNextSong();
      }
    };

    audioRef.current.addEventListener("ended", handleSongEnd);

    return () => {
      audioRef.current.removeEventListener("ended", handleSongEnd);
    };
  }, [isLooping]);

  
  useEffect(() => {
    function getTrackLength() {
      audioRef.current.addEventListener("loadedmetadata", function () {
        setDuration(audioRef.current.duration);
      });
    }

    getTrackLength();
  }, []);

  const onUpdateTimer = useCallback(() => {
    setTimer(audioRef.current.currentTime);
  }, []);

  const onTogglePlayMusic = useCallback(
    (event) => {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      setIsPlaying((prevState) => !prevState);
    },
    [isPlaying]
  );

  const handleNextSong = useCallback(() => {
    onNextSong();
  }, [onNextSong]);

  const handlePreviousSong = useCallback(() => {
    onPreviousSong();
  }, [onPreviousSong]);

  return (
    <div className="musicSpace">
      <div className="music-player">
        <h1 className="music-name">{name}</h1>

        <p className="artist-name">{artist}</p>

        <div
          className={`disk ${isPlaying ? "" : "play"}`}
          style={{
            backgroundImage: `url(${cover})`,
          }}
        />

        <div className="song-slider">
          <input
            type="range"
            max={duration}
            value={timer}
            className="slider"
            id="myRange"
            onInput={onChangeSlider}
          />
          <span className="current-time">{getDuration(timer)}</span>
          <span className="song-duration">{getDuration(duration)}</span>
        </div>

        <div className="controls">
          <button
            className={`btn forward-btn ${isLooping ? "looping" : ""}`}
            onClick={onToggleLooping}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </button>
          <button className="btn backward-btn" onClick={handlePreviousSong}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button className="play-btn pause" onClick={onTogglePlayMusic}>
            {isPlaying ? (
              <FontAwesomeIcon icon={faCaretRight} />
             
            ) : (
              <FontAwesomeIcon icon={faPause} />
            )}
          </button>
          <button className="btn forward-btn" onClick={handleNextSong}>
            <FontAwesomeIcon icon={faForward} />
          </button>

          <button
            className={`btn shuffle-btn ${isShuffling ? "shuffling" : ""}`}
            onClick={onToggleShuffle}
          >
            <FontAwesomeIcon icon={faShuffle} />
          </button>
        </div>

        <audio
          className="d-none"
          src={src}
          id="audio"
          ref={audioRef}
          onTimeUpdate={onUpdateTimer}
        />
      </div>
    </div>
  );
}

export default memo(MusicPlay);
