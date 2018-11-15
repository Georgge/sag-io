import React from 'react'

export const MiniCoverImage = (props) => {
  const { metadata } = props;
  const imageData = metadata.picture[0];
  const imageBuffer = imageData.data;
  const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
  return (
    <img
      className="mini-cover--image__with"
      src={`data:${imageData.format};base64, ${bufferTo64}`}
      alt={metadata.title}/>
  );
}

export const MiniCoverData = (props) => {
  const { title = '', artist = '' } = props;
  return (
    <div className="mini-cover--tags">
      <p>{title}</p>
      <p>{artist}</p>
    </div>
  );
}

const dataItem = (type, value) => {
  return (
    <div className="cover-data--item">
      <div className="cover-data--icon">
        <img src={`img/${type}-icon.png`} alt={value} />
      </div>
      <div className="cover-data--value">
        {value}
      </div>
    </div>
  );
}

export const CoverData = (props) => {
  const { state } = props;
  return (
    <div>
      {dataItem('title', state.title)}
      {dataItem('artist', state.artist)}
      {dataItem('album', state.album)}
      {dataItem('year', state.year)}
      {dataItem('genre', state.genre)}
      {dataItem('comment', state.comment)}
    </div>
  );
}
