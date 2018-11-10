import React, { Component } from 'react';

export default class MiniCover extends Component {
  render() {
    const { id, file, } = this.props;
    const tags = this.props.getTags(id, file);
    const { title = file, image } = tags[id];
    const { mime = false, imageBuffer = false } = image;
    console.log(imageBuffer);
    /*const buff = imageBuffer
                  ? new Buffer(imageBuffer)
                  : false;
    const img64 = buff
                  ? buff.toString('base64')
                  : false;*/
    return (
      <div>
        {
          title
        }
      </div>
    )
  }
}
