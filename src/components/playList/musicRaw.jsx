import React from 'react';

import styles from './music.module.scss';

function musicRaw(props) {
  return (
    <div className={styles.musicSpace}>
      <div className="music-player">
        <h1 className="music-name">song one</h1>

        <p className="artist-name">artist</p>

        <div className="disk"></div>

        <div className="song-slider">
          <input type="range" value="0" min="1" max="100" className="seek-bar" />
          <span className="current-time">00:00</span>
          <span className="song-duration">00:00</span>
        </div>

        <div className="controls">
          <button className="btn backward-btn"><i className="fa-solid fa-caret-left"></i></button>
          <button className="play-btn pause">
            <span></span>
            <span></span>
          </button>
          <button className="btn forward-btn"><i className="fa-solid fa-caret-right"></i></button>
        </div>
      </div>
    </div>
  );
}

export default musicRaw;