import React, { PureComponent } from 'react';
import SiriWave from 'siriwave';
import Player from './Player';
import {
  CurrentCover,
  CurrentCoverData, } from './PlayerComponents';

export default class SoundPlayer extends PureComponent {
  state = {
    currentKey: false,
    picture: false,
    title: '',
    artist: '',
    path: '',
    file: '',
    siriWave: null,
    playing: false,
  }

  soundState = (soundData) => {
    const { currentFile, picture,
      title, artist,
      path, file, format } = soundData;

    this.setState({ 
      currentKey: currentFile,
      picture,
      title,
      artist,
      path,
      file,
      format,
    })
  }

  handlePlay = (playing) => {
    console.log(playing);
    this.setState({ playing, })
    if (playing && this.state.siriWave !== null) {
      this.state.siriWave.start();
    } else if (!playing && this.state.siriWave !== null) {
      this.state.siriWave.stop();
    }
  }

  componentWillReceiveProps (props) {
    const { currentFile } = props.soundData;

    if (currentFile) {
      const { soundData } = props;
      this.soundState(soundData);
    }
  }

  componentDidMount () {
    console.log(this.state.playing);
    this.setState({
      siriWave: new SiriWave({
        container: document.getElementById('siriwave'),
        width: 600,
        height: 34,
        color: '#ff00cc',
      })
    })
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
          <Player
            path={this.state.path}
            file={this.state.file}
            play={this.state.currentKey ? true : false}
            format={this.state.format}
            spinner={this.props.spinner}
            hplay={this.handlePlay} />
          <div className="siri-wave" id="siriwave">
            <div className="siri-wave--line"></div>
          </div>
        </div>
        
      </div>
    )
  }
}
