import React, { PureComponent } from 'react';
import ReactHowler from 'react-howler';

const fs = window.require('fs');

export default class Player extends PureComponent {
  state = {
    path: '',
    file: '',
    sound64: '',
    format: '',
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
      });
    }
  }

  render() {
    return (
      <ReactHowler
        src={`data:audio/${this.state.format};base64, ${this.state.sound64}`}
        playing={this.props.play}
        html5={true}
        onLoad={load => {
          this.props.spinner();
        }}
        onLoadError={error => {
          console.log(error);
        }}
      />
    )
  }
}
