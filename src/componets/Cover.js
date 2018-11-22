import React, { PureComponent } from 'react';
import { SagIoDB } from '../store/Nedb';
import { CoverData,
  CoverImage,
  CoverBackground } from '../componets/Metadata';
import { CONSTANTS } from '../config/Constants';

const mm = window.require('music-metadata');

export default class Cover extends PureComponent {
  state = {
    currentKey: false,
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
    comment: '',
    picture: false,
  }

  upData = (current) => {
    SagIoDB.findOne({ _id: CONSTANTS.FILES_COLLECTION_ID }, (error, doc) => {
      const data = doc[current];
      mm.parseFile(`${data.path}/${data.file}`).then(metadata => {
        const { common } = metadata;
        const { format: { dataformat } } = metadata;
        const {
          title = data.file,
          artist = '', album = '',
          year = '', genre = '',
          comment = '', picture = false } = common;
        this.setState({
          title, artist,
          album, year,
          genre, comment,
          picture, currentKey: current,
        });
        this.props.setValues(picture, title, artist, data.path, data.file, dataformat);
      });
    })
  }

  componentWillReceiveProps (props) {
    if(props.current && (this.state.currentKey !== props.current)) {
      this.upData(props.current);
    }
  }

  render() {
    const { picture } = this.state;
    return (
      <div className="cover-container">
        <CoverBackground picture={picture} />
        <div className="cover">
          <div className="cover--image">
            <CoverImage picture={picture} />
          </div>
        </div>
        <div className="cover-data">
          <div className="buttons-edit">btn</div>
          <CoverData state={this.state} />
        </div>
      </div>
    )
  }
}
