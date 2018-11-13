import React from 'react';
import Async from 'react-promise';
const mm = window.require('music-metadata');

const imageRender = (metadata) => {
  const imageData = metadata.picture[0];
  const imageBuffer = imageData.data;
  const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
  return (
    <img
      className="mini-cover--image__with"
      src={`data:${imageData.format};base64, ${bufferTo64}`}
      alt={metadata.title}/>
  );
};

const tagsRender = (metadata, file) => {
  const { title = false, artist = false } = metadata.common;
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

export const MiniCover = (props) => {
  console.log(props)
  const file = `${props.directory}/${props.file}`;
  return (
    <Async
      promise={mm.parseFile(file)}
      then={data => <div>
        <div className="mini-cover--image">
          {data.common.picture
            ? imageRender(data.common)
            : <div className="mini-cover--image__without"></div>
          }
          <div></div>
        </div>
        { tagsRender(data, file) }
      </div>} />
  );
}

