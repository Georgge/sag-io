import React, { PureComponent } from 'react';
import SiriWave from 'siriwave';

export default class SiriWaveC extends PureComponent {
  state = {
    siriWave: null,
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

  componentWillReceiveProps (props) {
    const { playing } = props;

    if (playing && this.state.siriWave !== null) {
      this.state.siriWave.start();
    } else {
      this.state.siriWave.stop();
    }

  }

  render() {
    return (
      <div className="siri-wave" id="siriwave">
          <div className="siri-wave--line"></div>
      </div>
    )
  }
}
