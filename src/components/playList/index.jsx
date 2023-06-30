import React, { memo, useCallback, useEffect, useState } from "react";
import MusicPlay from "../playList/musicPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../playList/playList.css";

const allList = [
  {
    id: 1,
    name: "Day-Dut-Noi-Dau",
    cover: require("../../assets/image/1.jpg"),
    src: require("../../assets/music/Day-Dut-Noi-Dau-Mr-Siro.mp3"),
    artist: "-Mr-Siro",
    isLiked: false,
    duration: 0,
  },
  {
    id: 2,
    name: "Cho-Mot-Tinh-Yeu",
    cover: require("../../assets/image/2.jpg"),
    src: require("../../assets/music/Cho-Mot-Tinh-Yeu-My-Tam.mp3"),
    artist: "-My-Tam",
    isLiked: false,
    duration: 0,
  },
  {
    id: 3,
    name: "Khi-Nguoi-Minh-Yeu-Khoc",
    cover: require("../../assets/image/3.jpg"),
    src: require("../../assets/music/Khi-Nguoi-Minh-Yeu-Khoc-Phan-Manh-Quynh.mp3"),
    artist: "-Phan-Manh-Quynh",
    isLiked: false,
    duration: 0,
  },
  {
    id: 4,
    name: "Loi-Do-Em",
    cover: require("../../assets/image/4.jpg"),
    src: require("../../assets/music/Loi-Do-Em-Miko-Lan-Trinh.mp3"),
    artist: "-Miko-Lan-Trinh",
    isLiked: false,
  },
  {
    id: 5,
    name: "Ruc-Ro-Thang-Nam-Thang-Nam-Ruc-Ro-OST",
    cover: require("../../assets/image/5.jpg"),
    src: require("../../assets/music/Ruc-Ro-Thang-Nam-Thang-Nam-Ruc-Ro-OST-My-Tam.mp3"),
    artist: "-My-Tam",
    isLiked: false,
    duration: 0,
  },
  {
    id: 6,
    name: "Uoc-Gi",
    cover: require("../../assets/image/6.jpg"),
    src: require("../../assets/music/Uoc-Gi-My-Tam.mp3"),
    artist: "-My-Tam",
    isLiked: false,
    duration: 0,
  },
];

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function PlayList(props) {
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(0);
  const [playList, setPlayList] = useState(allList);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const selectedMusic = playList[selectedMusicIndex];

  const onHandleSelectedMusic = useCallback((index) => {
    setSelectedMusicIndex(index);
  }, []);

  const handleToggleShuffle = useCallback(() => {
    setIsShuffling((prevIsShuffling) => !prevIsShuffling);
  }, []);


   // next song
  const handleNextSong = useCallback(() => {
    setIsPlaying(true);

    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * playList.length);
      setSelectedMusicIndex(randomIndex);
    } else { 
      setSelectedMusicIndex((prevIndex) => (prevIndex + 1) % playList.length);
    }
  }, [isShuffling, playList]);

  // previous song
  const handlePreviousSong = useCallback(() => {
    setIsPlaying(true);
    if (isShuffling) {  
      const randomIndex = Math.floor(Math.random() * playList.length);
      setSelectedMusicIndex(randomIndex);
    } else {
      setSelectedMusicIndex((prevIndex) => (prevIndex - 1) % playList.length);
    }
  }, [isShuffling, playList]);

  // Loop song
  const handleToggleLooping = useCallback(() => {
    setIsLooping((prevState) => !prevState);
  }, []);

  // set repeat list song 
  useEffect(() => {
    setIsPlaying(true);
  }, [selectedMusic]);

  // set time song
  useEffect(() => {
    const updateSongDurations = async () => {
      for (const song of playList) {
        const audio = new Audio(song.src);
        audio.addEventListener("loadedmetadata", () => {
          song.duration = audio.duration;
          setPlayList((prevPlayList) => [...prevPlayList]);
        });
        await audio.load();
      }
    };
    updateSongDurations();
  }, [playList]);

  // handle click heart song
  const handleHeartClick = useCallback((index) => {
    setPlayList((prevPlayList) => {
      const updatedPlayList = [...prevPlayList];
      updatedPlayList[index] = {
        ...updatedPlayList[index],
        isLiked: !updatedPlayList[index].isLiked,
      };
      return updatedPlayList;
    });
  }, []);

  return (
    <div className="music-space">
      <div className="music-list">
        <div className="list-title text-strong">Most Popular</div>
        <div className="list-sub">{playList?.length} songs</div>
        <div className="play-list">
          {playList?.length > 0 ? (
            playList.map((m, index) => (
              <div className="play-item" key={m.name}>
                <button
                  className="play-block"
                  onClick={() => onHandleSelectedMusic(index)}
                >
                  <span className="index text-strong">{m.id}</span>
                  <img src={m.cover} alt="My Stress" className="thumbnail" />
                  {selectedMusic?.id === m.id ? (
                    <i className="fa-solid fa-volume-high play-icon"></i>
                  ) : (
                    <i className="fa-solid fa-play play-icon"></i>
                  )}
                  <span className="music-name text-strong">{m.name}</span>
                </button>
                <span className="play-author">{m.artist}</span>
                <span className="timer">{formatTime(m.duration)}</span>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={m.isLiked ? "heart" : "un-heart"}
                  onClick={() => handleHeartClick(index)}
                />
              </div>
            ))
          ) : (
            <p>Không có bài hát trong danh sách</p>
          )}
        </div>
      </div>
      <div className="music-playing">
        <MusicPlay
          name={selectedMusic.name}
          artist={selectedMusic.artist}
          cover={selectedMusic.cover}
          id={selectedMusic.id}
          src={selectedMusic.src}
          isPlay={isPlaying}
          onNextSong={handleNextSong}
          onPreviousSong={handlePreviousSong}
          isLooping={isLooping}
          onToggleLooping={handleToggleLooping}
          isShuffling={isShuffling}
          onToggleShuffle={handleToggleShuffle}
        />
      </div>
    </div>
  );
}

export default memo(PlayList);
