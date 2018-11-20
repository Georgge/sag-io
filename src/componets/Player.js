import React, { PureComponent } from 'react';
import ReactHowler from 'react-howler';
import SiriWave from 'siriwave';
import raf from 'raf';

const fs = window.require('fs');

export default class Player extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      path: '',
      file: '',
      sound64: '',
      format: '',
      duration: '00:00',
      seek: '00:00',
      siriWave: null,
      playing: false,
      loaded: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
  }

  setDuration = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time - minutes * 60);
    this.setState({ duration: `${minutes}:${seconds}` })
  }

  handleToggle () {
    this.setState({ playing: !this.state.playing }, () => {
      if (this.state.playing) {
        this.state.siriWave.start();
      } else {
        this.state.siriWave.stop();
      }
    });
  }

  handleOnLoad () {
    this.setState({ loaded: true });
    this.setDuration(this.player.duration())
    this.props.spinner();
    this.handleOnPlay();
  }

  handleOnPlay = () => {
    this.setState({playing: true});
    this.renderSeekPos();
    this.state.siriWave.start();
  }

  handleOnEnd () {
    this.state({ playing: false });
    this.clearRAF();
    this.state.siriWave.stop();
  }

  handleStop () {
    this.player.stop();
    this.setState({ playing: false });

  }

  renderSeekPos () {
    const time = this.player.seek();
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time - minutes * 60)
    this.setState({ seek: `${minutes}:${seconds}` })
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  componentWillReceiveProps (props) {
    const { path, file, format } = props;
    if (file !== this.state.file){
      fs.readFile(`${path}/${file}`, (error, data) => {
        if (error) console.log(error);
        const bufferTo64 = new Buffer(data.toString('base64'));
        this.setState({
          sound64: bufferTo64,
          file,
          path,
          format,
        })
        this.state.siriWave.stop();
      });
    }
  }

  componentDidMount () {
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
      <div className="control-player">
        <ReactHowler
          src={`data:audio/${this.state.format};base64, ${this.state.sound64}`}
          playing={this.state.playing}
          html5={true}
          ref={(ref) => (this.player = ref)}
          onPlay={this.handleOnPlay}
          onLoad={this.handleOnLoad}
          onEnd={this.handleOnEnd}
          loop={false}
        />

        <div className="control-player--timer">{this.state.seek}</div>
        <div className="control-player--central">
          <div className="control-player--buttons">
            <div
              className={this.state.playing
                          ? "control-player--pause"
                          : "control-player--play" }
              onClick={this.handleToggle}
              id="ppp">
            </div>
          </div>
          <div className="siri-wave" id="siriwave">
          <div className="siri-wave--line"></div>
          </div>
        </div>
        <div className="control-player--time">{this.state.duration}</div>
      </div>
    )
  }
}
