import React, { Component } from 'react';
import { SagIoDB } from '../store/Nedb';
import { CONSTANTS } from '../config/Constants';

export default class Cover extends Component {
  state = {
    title: false,
    artist: false,
    album: false,
    year: false,
    genre: false,
    comment: false,
  }

  upData = (current) => {
    SagIoDB.findOne(
      { 'files._id': current },
      (error, doc) => {
        console.log(doc)
      }
    )
    return (
      <p>oki!!</p>
    );
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
          {current
            ? this.upData(current)
            : <p>no ok!</p>
          }
        </div>
      </div>
    )
  }
}
