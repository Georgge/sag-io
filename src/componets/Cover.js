import React, { Component } from 'react';
import { SagIoDB } from '../store/Nedb';
import { CoverData } from '../componets/Metadata';
import { CONSTANTS } from '../config/Constants';

const mm = window.require('music-metadata');

export default class Cover extends Component {
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
          artist = '',
          album = '',
          year = '',
          genre = '',
          comment = '',
          picture = false } = common;
        this.setState({
          title,
          artist,
          album,
          year,
          genre,
          comment,
          picture,
          currentKey: current
        });
      });
    })
  }
  render() {
    const current = this.props.current;
    return (
      <div className="cover-container">
        <div className="cover">
          <div className="cover--image">
            <div className="cover--image__without"></div>
          </div>
        </div>
        <div className="cover-data">
          {current ? this.upData(current) : false }
          {this.state.currentKey
            ? <CoverData state={this.state} />
            : <div>No data yet</div>
          }
        </div>
      </div>
    )
  }
}
