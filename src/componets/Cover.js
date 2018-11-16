import React, { PureComponent } from 'react';
import { SagIoDB } from '../store/Nedb';
import { CoverData, CoverImage } from '../componets/Metadata';
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
        const {
          title = data.file,
          artist = '', album = '',
          year = '', genre = '',
          comment = '', picture = false } = common;
        this.setState({
          title, artist,
          album, year,
          genre, comment,
          picture, currentKey: current
        });
      });
    })
  }

  componentWillReceiveProps (props) {
    if(props.current)
      this.upData(props.current);
  }

  render() {
    return (
      <div className="cover-container">
        <div className="cover">
          <div className="cover--image">
            <CoverImage picture={this.state.picture} />
          </div>
        </div>
        <div className="cover-data">
          <CoverData state={this.state} />
        </div>
      </div>
    )
  }
}
