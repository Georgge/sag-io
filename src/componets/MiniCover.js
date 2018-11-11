import React from 'react';
import Async from 'react-promise';
const mm = window.require('music-metadata');

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
};

const tagsRender = (metadata, file) => {
  const { title = false, artist = false } = metadata;
  if (title && artist) {
    return (
      <div className="mini-cover--tags">
        <p>{title}</p>
        <p>{artist}</p>
      </div>
    );
  } else if (title && !artist) {
    return (
      <div className="mini-cover--tags">
        <p>{title}</p>
        <p></p>
      </div>
    );
  } else if (!title && artist) {
    return (
      <div className="mini-cover--tags">
        <p>{file}</p>
        <p>{artist}</p>
      </div>
    );
  } else {
    return (
      <div className="mini-cover--tags">
        <p>{file}</p>
        <p></p>
      </div>
    );
  }
};

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
        { tagsRender(data.common, file) }
      </div>} />
  );
}

