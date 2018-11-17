import React, { PureComponent } from 'react';
import {
  CurrentCover,
  CurrentCoverData, } from './PlayerComponents';

export default class SoundPlayer extends PureComponent {
  state = {
    currentKey: false,
    picture: false,
    title: '',
    artist: '',
  }

  soundState = (soundData) => {
    const { currentFile, picture, title, artist } = soundData;
    this.setState({ 
      currentKey: currentFile,
      picture,
      title,
      artist,
    });
  }

  componentWillReceiveProps (props) {
    if (props.current && (this.state.currentKey !== props.current)) {
      const { soundData } = props;
      this.soundState(soundData);
    }
  }

  render() {
    return (
      <div className="sound-player">
        <div className="cover-player">
          <CurrentCover
            soundPicture={this.state.picture}
            soundTitle={this.state.title} />
        </div>  
        <CurrentCoverData
          soundTitle={this.state.title}
          soundArtist={this.state.artist} />
        <div className="control-player">
          <div className="control-player--timer">0:00</div>
          <div className="control-player--central">
            <div className="control-player--buttons">
              <div className="control-player--play" id="ppp"></div>
            </div>
            <div className="siri-wave">SiriWave</div>
          </div>
          <div className="control-player--time">2:35</div>
        </div>
      </div>
    )
  }
}
