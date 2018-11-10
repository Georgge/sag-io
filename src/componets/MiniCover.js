import React from 'react';
import Async from 'react-promise';
const mm = window.require('music-metadata');
const util = require('util');

const imageRender = (metadata, title) => {
  const imageData = metadata[0];
  const imageBuffer = imageData.data;
  const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
  return (
    <img
      className="mini-cover--image__with"
      src={`data:${imageData.format};base64, ${bufferTo64}`}
      alt={title}/>
  );
}

export const MiniCover = ({children}) => {
  const file = children;
  const directory = localStorage.getItem('localDirectory');
  return (
    <Async
      promise={mm.parseFile(`${directory}/${file}`)}
      then={data => <div>
        <div className="mini-cover--image">
          {data.common.picture
            ? imageRender(data.common.picture, data.common.title)
            : <div className="mini-cover--image__without"></div>
          }
          <div></div>
        </div>
        <div className="mini-cover--tags">
          <p>{data.common.title}</p>
          <p>{data.common.artist}</p>
        </div>
      </div>} />
  );
}

